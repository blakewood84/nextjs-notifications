export function FollowNotification({
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
  const verbPrefix = verb.split(" ")[0].toLowerCase();

  const bgColor = !isSeen ? "bg-black" : "";

  return (
    <div
      className={`flex flex-row items-center cursor-pointer p-4 mb-2 hover:bg-blue-500/50`}
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
        <div className="ml-2 w-4 h-4 bg-blue-400 rounded-full"></div>
      </div>
    </div>
  );
}
