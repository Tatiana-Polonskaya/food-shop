import Image from "next/image";
import loadingPic from "/public/pizza_loader.gif";

export default function Loading() {
    return <Image src={loadingPic} alt="pizza" />;
}
