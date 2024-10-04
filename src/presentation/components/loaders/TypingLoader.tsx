import "./TypingLoader.css";

interface Props {
  className?: string;
}
export const TypingLoader = ({ className }: Props) => {
  return (
    <div className={`${className} typing`}>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
    </div>
  );
};
