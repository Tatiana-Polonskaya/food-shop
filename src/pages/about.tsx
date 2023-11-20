import MainLayout from "@/layouts/main-layout";
import Router from "next/router";

import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from "next";

type IAbout = {
  title: string;
  year: number;
};

export default function About({ title, year }: IAbout) {
  const handleClick = () => {
    Router.back();
  };

  return (
    <MainLayout title="About">
      <h1>
        {title} {" " + year}
      </h1>

      <button onClick={handleClick}>Go back to home</button>
    </MainLayout>
  );
}

// About.getInitialProps = async ({ query, req }: any) => {
//   const res = await fetch(`http://localhost:4200/about`);
//   const data = await res.json();
//   return { title: data.title };
// };

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IAbout>> => {
  const res = await fetch(`http://localhost:4200/about`);
  const data = await res.json();
  return { props: { title: data.title, year: 2023 } };
};
