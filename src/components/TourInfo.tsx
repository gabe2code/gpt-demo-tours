'use client'



import {Tour} from "@prisma/client";

const TourInfo = ({tour}: {tour: Tour}) => {
    const {title, description, stops} = tour;
    const arrayStops = stops as string[]
    return (
        <div className='max-w-2xl'>
            <h1 className='text-4xl font-semibold mb-4'>{title}</h1>
            <p className='leading-loose mb-6'>{description}</p>
            <ul>
                {arrayStops?.map(stop => (<li key={stop} className='mb-4 bg-base-100 p-4 rounded-xl'><p>{stop}</p></li>))}
            </ul>
        </div>
    );
};

export default TourInfo;
