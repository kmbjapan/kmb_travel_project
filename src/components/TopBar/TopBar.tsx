import TopNavList from "./NaviList/TopNavList";
import Logo from "./Logo/Logo";

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <div className="w-full bg-white-800 text-black flex items-center justify-between px-6 py-4 border-b border-gray-300">
      <Logo title={title} />
      <TopNavList></TopNavList>
    </div>
  );
};

export default TopBar;
