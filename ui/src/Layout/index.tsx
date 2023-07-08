import Content from './../Content';
import Navbar from './..//Navbar';
import Sidebar from './../Sidebar';

function Layout() {
  return (
    <div className="flex flex-col w-full h-[100vh]">
      <div className='w-full z-10'>
        <Navbar />
      </div>
      <div className="flex w-full flex-1 z-0">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

export default Layout;
