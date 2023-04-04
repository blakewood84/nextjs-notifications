import { users } from "@/stores/user";
import { useRouter } from "next/router";

export default function UserPage() {
  // find user
  const router = useRouter();
  const { user } = router.query;

  const userData = users.find((storeUser) => storeUser.id === user);

  return (
    <main className="flex flex-col justify-center items-center h-full w-full">
      <h1>{userData?.name}</h1>
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-60 rounded-full">
          <img src={userData?.image} />
        </div>
      </label>
      <p>Hey I'm {userData?.name} and this is my page</p>
    </main>
  );
}
