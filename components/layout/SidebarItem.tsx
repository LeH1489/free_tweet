import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons/lib";
import { BsDot } from "react-icons/bs";

interface SidebarItemsProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemsProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    //nếu user chưa đăng nhập
    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModal]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center ">
      {/* phần này dành cho mobile lg: hidden*/}
      <div
        className="relative rounded-full h-14 w-14 flex items-center justify-center 
      p-4 hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer lg:hidden"
      >
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
      {/* phần này dành cho desktop lg:...*/}
      <div
        className="relative hidden lg:flex items-center gap-4 p-4 rounded-full
       hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer"
      >
        <Icon size={24} color="black" />
        <p className="hidden lg:block text-black">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
