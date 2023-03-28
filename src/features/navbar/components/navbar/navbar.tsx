import { ProfileIcon } from "../profile_icon";

export function Navbar() {
  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">DROP</a>
      </div>
      <div className="navbar-end">
        <ProfileIcon />
      </div>
    </div>
  );
}
