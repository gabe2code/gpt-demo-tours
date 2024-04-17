import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import NewTour from "@/components/NewTour";
import {UNSPLASH_URL} from "@/utils/variables";

const NewTourPage = () => {
    const queryClient = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewTour url={UNSPLASH_URL} />
        </HydrationBoundary>
    );
};

export default NewTourPage;
