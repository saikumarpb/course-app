import { Outlet } from 'react-router-dom';

function Content() {
  return (
    <div className="w-full p-3">
      <Outlet />
    </div>
  );
}

export default Content;
