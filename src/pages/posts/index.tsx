
import { Foods, ListFood } from "@/entities/food";
import MainLayout from "@/layouts/main-layout";
import { NextPageContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

export type IPost = {
  id: number;
  title: string;
  description: string;
};

export default function Posts({
    posts: serverPosts,
    foods,
}: {
    posts?: IPost[];
    foods: Foods;
}) {
    const [posts, setPosts] = useState(serverPosts);

    useEffect(() => {
        async function load() {
            const res = await fetch("http://localhost:4200/posts");
            const data = await res.json();
            setPosts(data);
        }
        if (!posts) load();
    }, []);

    return (
        <MainLayout title="Posts Page">
            <h1>Posts</h1>
            <ul>
                {posts && posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <ListFood foods={foods} />
        </MainLayout>
    );
}

// // статический метод который определеяется на серверной стороне
// Posts.getInitialProps = async ({ req }: NextPageContext) => {
//   if (!req) {
//     return { posts: null };
//   }

//   const res = await fetch("http://localhost:4200/posts");
//   const posts = await res.json();

//   const res1 = await fetch("http://localhost:4200/drinks");
//   const foods = await res1.json();

//   return { posts, foods }; // вернуть нужно объект
// };

export async function getServerSideProps({ query, req }: NextPageContext) {
    const res1 = await fetch("http://localhost:4200/drinks");
    const foods = await res1.json();
    return { props: { foods } };
}
