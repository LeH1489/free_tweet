import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";
import { DiProlog } from "react-icons/di";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center
     hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition"
    >
      <DiProlog size={46} color="white" />
    </div>
  );
};

export default SidebarLogo;
