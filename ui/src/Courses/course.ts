import { useParams } from 'react-router-dom';

export default function Course() {
  const { courseId } = useParams();

  return `You are viewing ${courseId}`;
}
