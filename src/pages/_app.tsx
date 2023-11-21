import type { AppProps } from "next/app";
import { useState } from "react";
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            })
    );

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                </HydrationBoundary>
            </QueryClientProvider>
        </>
    );
}
