import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { CafeList } from "../../common/types/cafeList";
import cafeData from "../../data/coffee-stores.json";

export function getStaticProps({ params }: any) {
  return {
    props: {
      cafe: cafeData.find((cafe) => cafe.id.toString() === params.id),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
}

interface Props {
  cafe: CafeList;
}

const CoffeeStore: NextPage<Props> = ({ cafe }) => {
  const router = useRouter();

  return (
    <div>
      Coffee Store Page of id {router.query.id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <p>{cafe.address}</p>
      <p>{cafe.name}</p>
    </div>
  );
};

export default CoffeeStore;
