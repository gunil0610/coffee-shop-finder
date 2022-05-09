import type { NextPage } from "next";
import Head from "next/head";

import Banner from "../components/banner";
import Card from "../components/card";
import { CafeData } from "../common/types/cafeList";

import styles from "../styles/Home.module.css";
import Image from "next/image";
import { fetchCoffeeStores } from "lib/coffee-stores";

export async function getStaticProps() {
  const cafeList = await fetchCoffeeStores();

  return {
    props: {
      cafeList,
    },
  };
}

interface Props {
  cafeList: CafeData[];
}

const Home: NextPage<Props> = ({ cafeList }) => {
  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="hero-image"
            width={700}
            height={400}
          />
        </div>
        {cafeList.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto cafe</h2>
            <div className={styles.cardLayout}>
              {cafeList.map((cafe) => (
                <Card
                  key={cafe.id}
                  name={cafe.name}
                  href={`/coffee-store/${cafe.id}`}
                  imgUrl={
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
