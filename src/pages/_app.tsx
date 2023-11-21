import type { AppProps } from "next/app";
import { useState } from "react";
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { green, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: orange[600],
            light: "#fff",
            contrastText: "black",
        },
        secondary: {
            main: green[600],
        },
    },
});

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
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </HydrationBoundary>
            </QueryClientProvider>
        </>
    );
}
