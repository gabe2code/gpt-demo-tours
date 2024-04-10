import React from 'react';
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import ToursPage from "@/components/ToursPage";
import {getTours} from "@/actions/prisma";

const AllToursPage = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['tours'],
        queryFn: () => getTours()
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ToursPage/>
        </HydrationBoundary>
    );
};

export default AllToursPage;
