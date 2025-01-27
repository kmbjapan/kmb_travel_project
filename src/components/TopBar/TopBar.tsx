import TopNavList from "./NaviList/TopNavList";
import Logo from "./Logo/Logo"; 


const TopBar = () => {
  return (
    <div className="w-full bg-gray-800 text-white flex items-center justify-between px-6 py-4">
      <Logo />
      <TopNavList></TopNavList>
    </div>
  );
};

export default TopBar;
