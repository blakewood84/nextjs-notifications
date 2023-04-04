"use client";

import { API_KEY } from "@/config/constants";
import { useUser } from "@/stores/user";
import { connect } from "getstream";
import { useEffect, useRef } from "react";

export function FollowButton() {
  const { token } = useUser();
  const client = connect(API_KEY, null, "1241926");
  const idRef = useRef(2);

  useEffect(() => {
    if (token !== null) {
    }
  }, [token]);

  const handleFollow = async () => {
    console.log("following emanate");
    const feed = client.feed("notification", "emanate-live", token ?? "");

    const mau5trap = client.user("mau5trap");
    const emanate = client.user("emanate-live");

    const activity = {
      actor: mau5trap,
      verb: "Followed " + mau5trap.id,
      object: emanate,
      foreign_id: mau5trap.id + `:${idRef.current}`,
    };

    idRef.current += 1;

    await feed.addActivity(activity);

    console.log("activity updated!");
  };

  return (
    <button className="btn btn-primary mr-5" onClick={() => handleFollow()}>
      Follow
    </button>
  );
}
