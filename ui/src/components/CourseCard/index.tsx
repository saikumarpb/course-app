import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import { Course } from '../../Courses/types';

type CardProps = Course & {
  onClick: () => void;
  onEdit: () => void;
};

export default function CourseCard({
  title,
  imageLink,
  price,
  onClick,
  onEdit,
}: CardProps) {
  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardMedia
        component="img"
        height="194"
        image={imageLink}
        alt="Paella dish"
      />
      <CardContent>
        <div className='font-semibold'>
          {title}
        </div>
        <div className='font-semibold pt-3'>₹ {price}</div>
      </CardContent>
      <CardActions className='flex gap-2'>
        <Button size="small" onClick={() => onClick()} style={{textTransform: "none"}} variant='contained'>
          View more
        </Button>
        <Button size="small" onClick={() => onEdit()} style={{textTransform: "none"}} variant='contained'>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
