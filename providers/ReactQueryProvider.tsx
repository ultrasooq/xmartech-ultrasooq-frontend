"use client";

/**
 * @fileoverview React Query client provider for the Ultrasooq frontend.
 *
 * Wraps the component tree with TanStack React Query's {@link QueryClientProvider}
 * and {@link HydrationBoundary} so that server-prefetched query data can be
 * seamlessly hydrated into the client cache.
 *
 * Default query options:
 * - `refetchOnWindowFocus: false` -- prevents automatic refetches when the
 *   browser tab regains focus.
 * - `retry: false` -- disables automatic retries on query failure.
 * - `staleTime: 60_000` (1 minute) -- marks data as fresh for 60 seconds,
 *   reducing redundant network requests.
 *
 * @module providers/ReactQueryProvider
 */

import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";

/**
 * Client-side provider that initialises a {@link QueryClient} and wraps
 * children with both {@link QueryClientProvider} and {@link HydrationBoundary}.
 *
 * The `QueryClient` instance is created once via `useState` to ensure it
 * persists across re-renders without being re-created.
 *
 * @component
 * @param {React.PropsWithChildren} props
 * @param {React.ReactNode} props.children - The application component tree.
 * @returns {JSX.Element} The provider-wrapped children.
 *
 * @example
 * ```tsx
 * // In the root layout
 * <ReactQueryProvider>
 *   <App />
 * </ReactQueryProvider>
 * ```
 */
function ReactQueryProvider({ children }: React.PropsWithChildren) {
  /**
   * QueryClient instance.
   * Created inside `useState` so it is stable across renders and unique
   * per request when server-rendered.
   */
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          staleTime: 60 * 1000,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
