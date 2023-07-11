import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import { Course } from '../../Courses/types';

type CardProps = Course & {
  onClick: () => void;
  onEdit?: () => void;
};

export default function CourseCard({
  title,
  imageLink,
  price,
  onClick,
  onEdit,
}: CardProps) {
  return (
    <Card sx={{ width: 300, height: '100%' }}>
      <CardMedia
        component="img"
        image={imageLink}
        alt="Paella dish"
        style={{ height: '200px', width: '300px' }}
      />
      <CardContent>
        <div className="font-semibold">{title}</div>
        <div className="font-semibold pt-3">₹ {price}</div>
      </CardContent>
      <CardActions className="flex gap-2">
        <Button
          size="small"
          onClick={() => onClick()}
          style={{ textTransform: 'none' }}
          variant="contained"
        >
          View more
        </Button>
        {onEdit && (
          <Button
            size="small"
            onClick={() => onEdit()}
            style={{ textTransform: 'none' }}
            variant="contained"
          >
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

CourseCard.defaultProps = {
  onEdit: null,
};
