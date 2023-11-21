import MainLayout from "@/layouts/main-layout";
import { Categories, Category } from "@/types/category";
import CustomButton from "@/components/button";
import { useMemo, useState } from "react";
import { ListFood } from "@/components/list-cards";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import Filter from "@/components/filter";
import { Food, Foods } from "@/types/food";
import { Box, Typography } from "@mui/material";
import { Sorted } from "@/types/sorting";

async function getCategories() {
    return (await fetch(`${process.env.API_URL}/categories`).then((res) =>
        res.json()
    )) as Categories;
}

async function getFoods(nameFoods: string) {
    return (await fetch(`${process.env.API_URL}/${nameFoods}`).then((res) =>
        res.json()
    )) as Foods;
}

export default function Home() {
    const { data: categories } = useQuery<Categories>({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    const [activeCategory, setActiveCategory] = useState<Category>(
        categories![0]
    );

    const { data: serverFoods, isLoading } = useQuery({
        queryKey: ["foods", activeCategory.link],
        queryFn: () => getFoods(activeCategory.link),
        enabled: !!activeCategory,
    });

    const [typeSorting, setTypeSorting] = useState(Sorted.ABS);

    const handleFilterClick = (typeSorting: Sorted) => {
        setTypeSorting(typeSorting);
    };

    const foods = useMemo(() => {
        if (serverFoods) {
            const filterFunction =
                typeSorting === Sorted.ABS
                    ? (a: Food, b: Food) => a.price - b.price
                    : (a: Food, b: Food) => b.price - a.price;

            return serverFoods.sort(filterFunction);
        }
    }, [serverFoods, typeSorting]);

    return (
        <MainLayout title="Food Shop | Catalog">
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
            <Box padding={5} paddingTop={0}>
                <Box
                    padding={2}
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        fontWeight={600}
                        padding={2}
                        flexGrow={1}
                    >
                        {activeCategory && activeCategory.title}
                    </Typography>

                    <Filter
                        title="Цена"
                        currentSort={typeSorting}
                        onClick={handleFilterClick}
                    />
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
        queryFn: () => getCategories(),
    });

    const first_categories = categories![0].link;

    if (first_categories)
        await queryClient.prefetchQuery({
            queryKey: ["foods", first_categories],
            queryFn: () => getFoods(first_categories),
        });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
