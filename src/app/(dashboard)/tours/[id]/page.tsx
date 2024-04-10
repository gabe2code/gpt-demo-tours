import React from 'react';
import {getSingleTour} from "@/actions/prisma";
import Link from "next/link";
import TourInfo from "@/components/TourInfo";
import {redirect} from "next/navigation";
import {generateTourImage} from "@/actions/openIA";
import Image from "next/image";
import axios from "axios";
import {Tour} from "@prisma/client";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({params}: { params: { id: string } }) => {
    const tour = await getSingleTour(params.id) as Tour
    if (!tour) {
        return redirect('/tours')
    }

    const {data} = await axios(`${url}${tour.city}`)
    const tourImage = data.results[0].urls?.raw
    // const tourImage = await generateTourImage(tour?.city, tour?.country)

    return (
        <>
            <Link href='/tours' className='btn btn-secondary mb-12'>back to tours</Link>
            {tourImage && (<Image src={tourImage} alt={tour.title} width={300} height={300}
                                  className='rounded-xl shadow-xl mb-16 w-96 h-96 object-cover' priority/>)}
            <TourInfo tour={tour}/>
        </>
    );
};

export default SingleTourPage;
