"use client";

import { API_KEY } from "@/config/constants";
import { useUser } from "@/stores/user";
import { connect, DefaultGenerics, NewActivity, StreamClient } from "getstream";
import { useEffect, useState } from "react";

export function Notifications() {
  const { user, token } = useUser();
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    if (token !== null) handleFetchNotifications();
    return () => {
      console.log("Unmount");
    };
  }, [token]);

  const handleFetchNotifications = async () => {
    const client = connect(API_KEY, null, "12491926");

    const eric = client.feed("notification", "eric", token ?? "");

    // This should be a stream
    const notifications = await eric.get({ limit: 20 });
    console.log("notifications: ", notifications);
    setNotificationCount(notifications.unseen ?? 0);

    // Unseen is the badge icon
    // Unread is a highlight over each individual activity
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-ghost btn-circle"
        tabIndex={0}
        onClick={() => {
          // Mark all as seen
        }}
      >
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notificationCount > 0 && (
            <span className="badge badge-xs badge-error indicator-item">
              {notificationCount}
            </span>
          )}
        </div>
      </button>
      <div className="dropdown-content bg-base-200 text-base-content rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
        <div tabIndex={0}>
          <button className="btn">Hello World</button>
        </div>
      </div>
    </div>
  );
}
