"use client";

import { API_KEY } from "@/config/constants";
import { useUser } from "@/stores/user";
import { connect } from "getstream";
import { useEffect, useState } from "react";
import { NotificationsDropdown } from "../notifications_dropdown";

export function Notifications() {
  const { token } = useUser();
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const client = connect(API_KEY, null, "1241926");

  useEffect(() => {
    if (token !== null) handleFetchNotifications();
    return () => {
      console.log("Unmount");
    };
  }, [token]);

  // When loading check notifications count
  // Then subscribe, any new event on subscribe will force a new get on notifications

  const handleFetchNotifications = async () => {
    const notificationsFeed = client.feed(
      "notification",
      "emanate-live",
      token ?? ""
    );

    const initialCount = (await notificationsFeed.get()).unseen ?? 0;

    setNotificationCount(initialCount);

    notificationsFeed
      .subscribe(async (snapshot) => {
        console.log("new snapshot: ", snapshot);
        const unseen = (await notificationsFeed.get()).unseen ?? 0;
        setNotificationCount(unseen);
      })
      .then(
        () => {
          console.log("Subscribed!");
        },
        (data) => {
          console.log("something went wrong: ", data);
        }
      );
  };

  // Set's all notifications as seen
  const handleSetAsSeen = async () => {
    console.log("marking as seen");
    const notificationsFeed = await client
      .feed("notification", "emanate-live", token ?? "")
      .get({ mark_seen: true });

    setNotificationCount(0);

    console.log("marked as seen");
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-ghost btn-circle"
        tabIndex={0}
        onClick={() => {
          // Mark all as seen
          setIsOpen(!isOpen);
          handleSetAsSeen();
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
      {isOpen && (
        <NotificationsDropdown closeCallback={() => setIsOpen(false)} />
      )}
    </div>
  );
}
