import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="flex h-[100%] justify-center items-center">
      <CircularProgress />
    </div>
  );
}
