import Image from "next/image";

type Props = {
    title: string;
    price: string;
    imageLink: string;
    description: string;
};

export default function Card({ title, price, imageLink, description }: Props) {
    return (
        <div className="w-60 flex flex-col items-center rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <img
                className="w-56 h-56 rounded-t-lg"
                src={imageLink}
                alt={title}
            />
            <div className="p-6">
                <h5 className="text-lg font-medium text-center text-green-500">
                    {price}
                </h5>
                <h5 className="text-xl font-medium text-center">
                    {title[0].toUpperCase() + title.slice(1)}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 text-center">
                    {description}
                </p>
            </div>
        </div>
    );
}
