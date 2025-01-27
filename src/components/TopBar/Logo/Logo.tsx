//Icon
import { IconType } from "react-icons";

interface LogoProps {
  title: string;
  icon: IconType;
}

const Logo: React.FC<LogoProps> = ({ title, icon: Icon }) => {
  return (
    <div className="flex items-center text-2xl font-bold">
      <Icon className="mr-6" />
      {title}
    </div>
  );
};

export default Logo;
