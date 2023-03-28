import { ProfileIcon } from "../profile_icon";
import { Notifications } from "../notifications";

export function Navbar() {
  return (
    <div className="navbar bg-black fixed top-0 flex justify-center w-full">
      <div className="navbar-start ml-10">
        <a className="btn btn-ghost normal-case text-xl">DROP</a>
      </div>
      <div className="navbar-end mr-20">
        <ProfileIcon />
        <Notifications />
      </div>
    </div>
  );
}
