import { useMemo, useState } from "react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

import MainLayout from "@/layouts/main-layout";

import { getCategories, getFoods } from "@/api";

import { Categories, Category } from "@/types/category";
import { Food } from "@/types/food";
import { Sorted } from "@/types/sorting";

import CustomButton from "@/components/button";
import { ListFood } from "@/components/list-cards";
import Sorting from "@/components/sorting";
import Filter from "@/components/filter";
import Loading from "@/components/loader";

import { Box, Typography } from "@mui/material";


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
    const handleSortingClick = (typeSorting: Sorted) => {
        setTypeSorting(typeSorting);
    };

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);

    const handleChangeInterval = (minValue: number, maxValue: number) => {
        setMinPrice(minValue);
        setMaxPrice(maxValue);
    };

    const foods = useMemo(() => {
        if (serverFoods) {
            let arr = serverFoods;
            if (minPrice !== 0 || maxPrice !== 0) {
                console.log(minPrice, maxPrice);
                arr = arr.filter(
                    (el) => el.price >= minPrice! && el.price <= maxPrice!
                );
            }
            const filterFunction =
                typeSorting === Sorted.ABS
                    ? (a: Food, b: Food) => a.price - b.price
                    : (a: Food, b: Food) => b.price - a.price;

            return arr.sort(filterFunction);
        }
    }, [serverFoods, typeSorting, minPrice, maxPrice]);

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
                        minNumber={minPrice}
                        maxNumber={maxPrice}
                        setInterval={handleChangeInterval}
                    />

                    <Sorting
                        title="Цена"
                        currentSort={typeSorting}
                        onClick={handleSortingClick}
                    />
                </Box>

                {foods && <ListFood foods={foods} />}
                {foods?.length === 0 && !isLoading && (
                    <Typography padding={5} align="center">
                        Ничего не найдено! :( <br /> Попробуйте изменить условия
                        фильтра
                    </Typography>
                )}
                {isLoading && <Loading />}
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
