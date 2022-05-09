import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import cls from "classnames";

import { TransformedCafeData } from "../../common/types/cafeList";
import styles from "../../styles/coffee-store.module.css";

import { fetchCoffeeStores } from "lib/coffee-stores";

export async function getStaticProps({ params }: any) {
  const cafeData = await fetchCoffeeStores();
  return {
    props: {
      cafe: cafeData.find((cafe: any) => cafe.id.toString() === params.id),
    },
  };
}

export async function getStaticPaths() {
  const cafeData = await fetchCoffeeStores();
  const paths = cafeData.map((cafe: any) => ({
    params: { id: cafe.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

interface Props {
  cafe: TransformedCafeData;
}

const CoffeeStore: NextPage<Props> = ({ cafe }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, neighborhood, name, imgUrl } = cafe;

  const handleUpvoteButton = () => {
    console.log("handle upvote");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              width={600}
              height={360}
              alt={name}
              className={styles.storeImg}
            />
          </div>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="places icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt="near me icon"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="star icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
