import type { AppProps } from "next/app";
import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";

import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

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
                    <NextNProgress
                        color="yellow"
                        startPosition={0.3}
                        stopDelayMs={200}
                        height={3}
                        showOnShallow={true}
                    />
                    <Component {...pageProps} />
                </HydrationBoundary>
            </QueryClientProvider>
        </>
    );
}
