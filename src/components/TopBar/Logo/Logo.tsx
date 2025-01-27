interface LogoProps {
  title: string;
}

const Logo: React.FC<LogoProps> = ({ title }) => {
  return <div className="text-xl font-bold">{title}</div>;
};

export default Logo;
