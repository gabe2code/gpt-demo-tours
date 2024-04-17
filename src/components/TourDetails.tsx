import React from 'react';
import axios from "axios";
import {Tour} from "@prisma/client";
import Image from "next/image";
import TourInfo from "@/components/TourInfo";

const TourDetails = async ({tour, url}:{tour: Tour, url: string}) => {
    const {data} = await axios(`${url}${tour.city}`)
    const tourImage = data.results[0].urls?.raw
    // const tourImage = await generateTourImage(tour?.city, tour?.country)
    return (
        <>
            {tourImage && (<Image src={tourImage} alt={tour.title} width={400} height={400}
                                  className='rounded-xl shadow-xl mb-16 w-96 h-96 object-cover' priority/>)}
            <TourInfo tour={tour}/>
        </>
    );
};

export default TourDetails;
