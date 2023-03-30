"use client";

import Loading from "@/components/loading/loading";
import { API_KEY } from "@/config/constants";
import { useUser } from "@/stores/user";
import { connect } from "getstream";
import { ReactNode, useEffect, useState } from "react";

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

    let list = [];

    for (const event of response.results) {
      const result = { ...event } as any;
      const isSeen = result.is_seen as boolean;
      const groupId = result.id as string;

      for (const activity of event.activities as any[]) {
        list.push({ ...activity, isSeen, groupId });
      }
    }

    // setNotifications(list);
  };

  return (
    <div className="dropdown-content bg-base-200 text-base-content rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
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

function LikedNotification(props: any) {
  return <h1>hello</h1>;
}

function FollowNotification({
  notification,
  userId,
}: {
  notification: any;
  userId: string;
}) {
  console.log(notification);
  const { foreign_id, time, verb, actor, object, isSeen, groupId } =
    notification;
  const { id: actorId, data } = actor;
  const {
    id: objectId,
    data: {
      image: objectImage,
      name: objectName,
      profile_url: objectProfileUrl,
    },
  } = object;
  const {
    image: actorImage,
    name: actorName,
    profile_url: actorProfileUrl,
  } = data;

  const isUser = object.id === userId;
  const verbPrefix = verb.split(" ")[0];

  return (
    <div className="flex">
      {actorName} {verbPrefix} {objectName}
    </div>
  );
}
