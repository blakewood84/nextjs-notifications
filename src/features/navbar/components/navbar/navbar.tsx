import { ProfileIcon } from "../profile_icon";

export function Navbar() {
  return (
    <div className="navbar bg-black">
      <div className="navbar-start ml-10">
        <a className="btn btn-ghost normal-case text-xl">DROP</a>
      </div>
      <div className="navbar-end mr-20">
        <ProfileIcon />
      </div>
    </div>
  );
}
