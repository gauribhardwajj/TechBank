// import { LogoutIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();

  return (
    <div className={`h-20 bg-blue-900 border-b-2 shadow-md z-50`}>
      <div className="w-screen  px-5 md:px-0 md:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex items-center justify-between h-full">
        <div>
          <h1
            onClick={() => router.push(`/`)}
            className="hidden md:inline-block font-Dongle text-4xl before:block before:absolute relative hover:cursor-pointer"
          >
            <span className="relative text-white text-xl">
              TechBank India Ltd.
            </span>
          </h1>
        </div>
        <ul className="flex items-center space-x-4 sm:space-x-7">
          <li
            onClick={() => router.push("/")}
            className={`link text-gray-200 hover:text-white text-md sm:text-base ${
              router.pathname === "/" && "active"
            }`}
          >
            Home
          </li>
          <li
            onClick={() => router.push("/users")}
            className={`link text-gray-200 hover:text-white text-md sm:text-base ${
              router.pathname === "/users" && "active"
            }`}
          >
            Users
          </li>
          <li
            onClick={() => router.push(`/transferMoney`)}
            className={`link text-gray-200 hover:text-white text-md ${
              router.pathname === "/transferMoney" && "active"
            }`}
          >
            Transfer Money
          </li>
          <li
            onClick={() => router.push(`/createUser`)}
            className={`px-2 py-2 rounded-md cursor-pointer text-white hover:text-white bg-purple-500 hover:bg-purple-700 border-0 ${
              router.pathname === "/createUser" && "active"
            }`}
          >
            Create User
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
