"use client";

import { useUser } from "@/stores/user/user";

export function ProfileIcon() {
  const { user, switchUser } = useUser();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={user.image} />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between" onClick={() => switchUser()}>
            Switch Profile
            <span className="badge">New</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
