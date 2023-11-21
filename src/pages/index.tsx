import MainLayout from "@/layouts/main-layout";
import { Categories, Category } from "@/types/category";
import CustomButton from "@/components/button";
import { useMemo, useState } from "react";
import { ListFood } from "@/components/list-cards";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import Filter from "@/components/filter";
import { Food } from "@/types/food";
import { Box } from "@mui/material";

export default function Home() {
    const { data: categories } = useQuery<Categories>({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(`${process.env.API_URL}/categories`).then((res) =>
                res.json()
            ),
    });

    const [activeCategory, setActiveCategory] = useState<Category>(
        categories![0]
    );

    const { data: serverFoods, isLoading } = useQuery({
        queryKey: ["foods", activeCategory.link],
        queryFn: () =>
            fetch(`${process.env.API_URL}/${activeCategory.link}`).then((res) =>
                res.json()
            ),
        enabled: !!activeCategory,
    });

    const [sortedByAbs, setSortedByAbs] = useState(true);

    const foods = useMemo(() => {
        if (serverFoods) {
            const filterFunction = sortedByAbs
                ? (a: Food, b: Food) => a.price - b.price
                : (a: Food, b: Food) => b.price - a.price;
            console.log(filterFunction, serverFoods.sort(filterFunction));
            return serverFoods.sort(filterFunction);
        }
    }, [serverFoods, sortedByAbs]);

    const handleFilterClick = (sortedByAbs: boolean) => {
        setSortedByAbs(sortedByAbs);
    };

    return (
        <MainLayout title="Home Page">
            <Box
                paddingLeft={5}
                paddingTop={3}
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="flex-start"
                alignItems="center"
                gap={2}
            >
                {categories &&
                    categories.map((el) => (
                        <CustomButton
                            key={el.id}
                            title={el.title}
                            onClick={() => setActiveCategory(el)}
                        ></CustomButton>
                    ))}
            </Box>
            <Box
                padding={5}
                paddingTop={0}
            >
                <Box
                    padding={2}
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <h1>{activeCategory && activeCategory.title}</h1>

                    <Filter title="Цена" onClick={handleFilterClick} />
                </Box>

                {foods && <ListFood foods={foods} />}
                {isLoading && <div>Loading ...</div>}
            </Box>
        </MainLayout>
    );
}

export async function getServerSideProps() {
    const queryClient = new QueryClient();

    const categories = await queryClient.fetchQuery<Categories>({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(`${process.env.API_URL}/categories`).then((res) =>
                res.json()
            ),
    });

    const first_categories = categories![0];

    if (first_categories)
        await queryClient.prefetchQuery({
            queryKey: ["foods", first_categories!.link],
            queryFn: () =>
                fetch(`${process.env.API_URL}/${first_categories!.link}`).then(
                    (res) => res.json()
                ),
        });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
