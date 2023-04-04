"use client";

import { API_KEY, APP_SECRET } from "@/config/constants";
import { useUser } from "@/stores/user";
import { connect } from "getstream";
import { useEffect, useRef } from "react";

export function FollowButton() {
  const { otherToken } = useUser();

  useEffect(() => {
    if (otherToken !== null) {
    }
  }, [otherToken]);

  const handleFollow = async () => {
    console.log("token: ", otherToken);
    // const feed = client.feed("user", "chris", token!);
    const client = connect(API_KEY, otherToken, "1241926");
    const feed = client.feed("notification", "emanate-live");

    const activity = {
      actor: client.currentUser!,
      verb: "Followed " + "mau5trap",
      object: client.user("emanate-live"),
      foreign_id: "mau5trap" + `:1`,
    };

    // idRef.current += 1;

    try {
      await feed.addActivity(activity);
      console.log("activity updated!");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <button className="btn btn-primary mr-5" onClick={() => handleFollow()}>
      Follow
    </button>
  );
}

async function getServerSideProps() {
  const client = connect(API_KEY, APP_SECRET);

  const token = await client.createUserToken("emanate-live");

  return {
    otherToken: token,
  };
}
