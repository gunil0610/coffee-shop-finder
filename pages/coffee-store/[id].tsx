import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      Coffee Store Page of id {router.query.id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
