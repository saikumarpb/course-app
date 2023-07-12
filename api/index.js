import express, { json } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { connect, Types } from 'mongoose';
import { User, Admin, Course } from './models.js';
import { authMiddleware } from './middleware.js';
import { DB_URL, PORT, JWT_SECRET, loadConfig } from './loadConfig.js';
import cors from 'cors';

const { sign } = jsonwebtoken;

loadConfig();

const app = express();

app.use(cors());

app.use(json());

connect(DB_URL);

// Admin routes
app.get('/me', authMiddleware, async (req, res) => {
  res.json(req.user);
});

app.post('/admin/signup', async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });
  const admin = await Admin.findOne({ username });

  if (user || admin) {
    res.status(400).send('Username taken');
  } else {
    const newAdmin = new Admin(req.body);

    newAdmin
      .save()
      .then(() => {
        res.status(201).send({
          message: 'Admin created successfully',
          token: getJwtToken(username, 'admin'),
        });
      })
      .catch((e) => {
        res.status(400).send(e.message);
      });
  }
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    res.send({
      message: 'Logged in successfully',
      token: getJwtToken(admin.username, 'admin'),
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.post('/admin/courses', authMiddleware, async (req, res) => {
  try {
    const newCourse = await new Course(req.body).save();
    res
      .status(201)
      .send({ message: 'Course created successfully', courseId: newCourse.id });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.put('/admin/courses/:courseId', authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const id = new Types.ObjectId(courseId);
    const course = await Course.findByIdAndUpdate(id, req.body);

    if (course) {
      res.send({ message: 'Course updated successfully' });
    } else {
      res.status(404).send('Not found');
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

app.get('/admin/courses', authMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.send({ courses });
});

app.delete('/admin/courses/:courseId', authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;

  try {
    await Course.findByIdAndDelete(courseId);
    res.status(200).send('Course deleted successfully');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// User routes
app.post('/users/signup', async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });
  const admin = await Admin.findOne({ username });

  if (user || admin) {
    res.status(400).send('Username taken');
  } else {
    try {
      const newUser = new User(req.body);
      await newUser.save();
    } catch (e) {
      return res.status(400).send(e.message);
    }

    res.status(201).send({
      message: 'User created successfully',
      token: getJwtToken(username),
    });
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (user) {
    res.send({
      message: 'Logged in successfully',
      token: getJwtToken(user.username),
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.get('/users/courses', authMiddleware, async (req, res) => {
  const courses = await Course.find({ published: true });

  res.send({ courses });
});

app.post('/users/courses/:courseId', authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);

    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.courses.push(course);
        try {
          await user.save();
        } catch (e) {
          return res.send({ message: e.message });
        }
        res.send({ message: 'Course purchased successfully' });
      } else {
        res.status(403).send({ message: 'User not found' });
      }
    }
  } catch (e) {
    console.log(e.message);
  }
  return res.status(404).send({ message: 'Course not found' });
});

app.get('/users/purchasedCourses', authMiddleware, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    'courses'
  );
  res.send({ purchasedCourses: user.courses });
});

app.get('/courses', async (req, res) => {
  const courses = await Course.find({ published: true });

  res.send({ courses });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// Helper functions

function getJwtToken(username, role = 'user') {
  const expiresIn = '1h';
  return sign({ username: username, role: role }, JWT_SECRET, {
    expiresIn,
  });
}

export default app;
