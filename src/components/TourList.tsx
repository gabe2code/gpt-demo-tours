import React from 'react';
import TourCard from "@/components/TourCard";
import {Tour} from "@prisma/client";


const TourList = ({tours}: { tours?: Tour[] }) => {
    if (tours?.length === 0) {
        return <h4 className="text-lg">No tours found...</h4>
    }
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {tours?.map((tour) => (<TourCard key={tour.title} tour={tour}/>))}
        </div>
    );
};

export default TourList;
