import {
  FileDownload,
  Home,
  Logout,
  School,
  Settings,
} from '@mui/icons-material';
import { Button } from '@mui/material';

interface SidebarButtonProps {
  icon: JSX.Element;
  name: string | JSX.Element;
}

function Sidebar() {
  return (
    <div className="w-[200px] bg-slate-200 left-0 bottom-0 z-0 flex flex-col gap-5 p-2">
      <div className="text-gray-600 mt-5 px-2 font-semibold">Main Menu</div>
      <SidebarButton icon={<Home className="mr-2" />} name="Home" />
      <SidebarButton icon={<School className="mr-2" />} name={'Courses'} />
      <div className="border-b border-gray-300"></div>
      <SidebarButton
        icon={<FileDownload className="mr-2" />}
        name={'Purchases'}
      />
      <SidebarButton icon={<Settings className="mr-2" />} name={'Settings'} />
      <SidebarButton icon={<Logout className="mr-2" />} name={'Logout'} />
    </div>
  );
}

function SidebarButton({ icon, name }: SidebarButtonProps) {
  return (
    <Button
      variant="text"
      color="inherit"
      className="flex !justify-start w-auto"
      type="button"
      style={{ textTransform: 'none' }}
    >
      {icon}
      <div>{name}</div>
    </Button>
  );
}

export default Sidebar;
