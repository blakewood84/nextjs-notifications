import { API_KEY } from "@/config/constants";
import { useUser } from "@/stores/user";
import { connect } from "getstream";
import Router from "next/router";

export function FollowNotification({
  notification,
  userId,
  closeCallback,
}: {
  notification: any;
  userId: string;
  closeCallback: () => void;
}) {
  const { token } = useUser();
  const client = connect(API_KEY, null, "1241926");

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
  const verbPrefix = verb.split(" ")[0].toLowerCase();

  const handleOnClick = async () => {
    const notificationsFeed = client.feed(
      "notification",
      "emanate-live",
      token ?? ""
    );

    // Set notification as read
    if (!notification.isRead) {
      console.log("marking as read");
      await notificationsFeed
        .get({ mark_read: [notification.groupId] })
        .then((data) => {
          console.log("marked as read!");
          console.log("data: ", data);
        })
        .catch((reason) => {
          console.log("Error marking as read: ", reason);
        });
    }

    console.log(notification);
    Router.push(`/${actorName}`);
    closeCallback();
    // Navigate to user page
  };

  return (
    <div
      className={`flex flex-row items-center cursor-pointer p-4 mb-2 hover:bg-blue-500/50`}
      onClick={() => {
        handleOnClick();
      }}
    >
      <div style={{ width: "90%" }} className="flex flex-row items-center">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={actorImage} />
          </div>
        </label>
        <span style={{ fontSize: 12 }} className="ml-2">
          {actorName} {verbPrefix} {isUser ? "you" : objectName}
        </span>
      </div>
      <div style={{ width: "10%" }}>
        {!notification.isRead && (
          <div className="ml-2 w-4 h-4 bg-blue-400 rounded-full" />
        )}
      </div>
    </div>
  );
}
