import { BsHouseDoor, BsBell } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  //lấy user hiện tại bằng custom hook useCurrentUser (hook này tự động refetch data)
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseDoor,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBell,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Prolife",
      href: `/users/${currentUser?.id}`,
      icon: BiUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6 ">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px] fixed ">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
