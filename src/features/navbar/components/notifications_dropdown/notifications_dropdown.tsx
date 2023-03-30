"use client";

import Loading from "@/components/loading/loading";
import { API_KEY } from "@/config/constants";
import { useUser } from "@/stores/user";
import { connect } from "getstream";
import { useEffect, useState } from "react";
import { FollowNotification, LikedNotification } from "../notification_types";

export function NotificationsDropdown() {
  const { token, user } = useUser();
  const [notifications, setNotifications] = useState<any[] | null>(null);

  const client = connect(API_KEY, null, "1241926");

  useEffect(() => {
    // Fetch the activities for the feed
    if (token !== null) {
      handleFetchNotifications();
    }
    return () => {
      console.log("dispose notification dropdown");
    };
  }, [token]);

  const handleFetchNotifications = async () => {
    const response = await client
      .feed("notification", user.id, token ?? "")
      .get({ enrich: true });

    let list: any = [];

    for (const event of response.results) {
      const result = { ...event } as any;
      const isSeen = result.is_seen as boolean;
      const groupId = result.id as string;

      for (const activity of event.activities as any[]) {
        list.push({ ...activity, isSeen, groupId });
      }
    }

    // await setTimeout(() => {
    //   setNotifications(list);
    // }, 1000);
    setNotifications(list);
  };

  return (
    <div className="dropdown-content bg-base-200 text-base-content rounded-b-box top-px max-h-96 h-[70vh] w-64 overflow-y-auto shadow-2xl mt-16">
      <div tabIndex={0}>
        {notifications === null ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          notifications.map((notification) => {
            const verb: string = notification.verb.split(" ")[0];
            switch (verb) {
              case "Followed": {
                return (
                  <FollowNotification
                    notification={notification}
                    userId={user.id}
                  />
                );
              }
              case "Liked": {
                return <LikedNotification />;
              }
              default:
                return <div>Unknown</div>;
            }
          })
        )}
      </div>
    </div>
  );
}
