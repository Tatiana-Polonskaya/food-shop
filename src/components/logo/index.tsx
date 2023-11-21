import Image from "next/image";

export default function Logo() {
    return (
        <Image
            src={`https://www.svgrepo.com/show/56157/pizza.svg`}
            width={25}
            height={25}
            alt="pizza"
        />
    );
}
