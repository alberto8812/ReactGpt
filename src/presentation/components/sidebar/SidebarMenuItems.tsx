import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  icon: string;
  title: string;
  description: string;
}
export const SidebarMenuItems = ({ to, icon, description, title }: Props) => {
  return (
    <>
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          isActive
            ? "flex flex-row items-center p-2 my-1 bg-gray-800  rounded-md transition-colors"
            : "flex flex-row items-center p-2 my-1 hover:bg-gray-800 rounded-md transition-colors"
        }
      >
        <i className={`text-2xl ${icon} mr-4 text-indigo-400`} />
        <div className="flex flex-col flex-grow">
          <span className="font-semibold text-lg text-white">{title}</span>
          <span className="text-gray-400 text-sm ">{description}</span>
        </div>
      </NavLink>
    </>
  );
};
