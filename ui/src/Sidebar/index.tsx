import {
  FileDownload,
  Home,
  Logout,
  School,
  Settings,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { authState } from '../recoil/auth/atom';
import { useNavigate } from 'react-router-dom';

interface SidebarButtonProps {
  icon: JSX.Element;
  name: string | JSX.Element;
  onClick: () => void;
}

function Sidebar() {
  const auth = useRecoilValue(authState);
  const resetAuth = useResetRecoilState(authState);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    resetAuth();
  };
  return (
    <div className="w-[200px] bg-slate-200 left-0 bottom-0 z-0 flex flex-col gap-5 p-2">
      <div className="text-gray-600 mt-5 px-2 font-semibold">Main Menu</div>
      <SidebarButton
        icon={<Home className="mr-2" />}
        name="Home"
        onClick={() => {
          navigate('');
        }}
      />
      <SidebarButton
        icon={<School className="mr-2" />}
        name={'Courses'}
        onClick={() => {
          navigate('courses');
        }}
      />
      {auth.isLoggedin && (
        <>
          <div className="border-b border-gray-300"></div>
          {auth.role === 'user' && (
            <SidebarButton
              icon={<FileDownload className="mr-2" />}
              name={'Purchases'}
              onClick={() => {}}
            />
          )}
          <SidebarButton
            icon={<Settings className="mr-2" />}
            name={'Settings'}
            onClick={() => {}}
          />
          <SidebarButton
            icon={<Logout className="mr-2" />}
            name={'Logout'}
            onClick={logoutHandler}
          />
        </>
      )}
    </div>
  );
}

function SidebarButton({ icon, name, onClick }: SidebarButtonProps) {
  return (
    <Button
      variant="text"
      color="inherit"
      className="flex !justify-start w-auto"
      type="button"
      style={{ textTransform: 'none' }}
      onClick={onClick}
    >
      {icon}
      <div>{name}</div>
    </Button>
  );
}

export default Sidebar;
