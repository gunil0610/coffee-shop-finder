import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { CafeList } from "../../common/types/cafeList";
import cafeData from "../../data/coffee-stores.json";
import Head from "next/head";

export function getStaticProps({ params }: any) {
  return {
    props: {
      cafe: cafeData.find((cafe) => cafe.id.toString() === params.id),
    },
  };
}

export function getStaticPaths() {
  const paths = cafeData.map((cafe) => ({
    params: { id: cafe.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

interface Props {
  cafe: CafeList;
}

const CoffeeStore: NextPage<Props> = ({ cafe }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood } = cafe;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export default CoffeeStore;
