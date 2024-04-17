import React from 'react';
import {getSingleTour} from "@/actions/prisma";
import Link from "next/link";
import {redirect} from "next/navigation";
import {Tour} from "@prisma/client";
import TourDetails from "@/components/TourDetails";
import {UNSPLASH_URL} from "@/utils/variables";
import Image from "next/image";
import {generateTourImage} from "@/actions/openIA";
import TourInfo from "@/components/TourInfo";

const SingleTourPage = async ({params}: { params: { id: string } }) => {
    const tour = await getSingleTour(params.id) as Tour
    if (!tour) {
        return redirect('/tours')
    }
    // const tourImage = await generateTourImage(tour?.city, tour?.country)
    return (
        <>
            <Link href='/tours' className='btn btn-secondary mb-12'>back to tours</Link>
            {/*{tourImage && (<Image src={tourImage} alt={tour.title} width={400} height={400}*/}
            {/*                      className='rounded-xl shadow-xl mb-16 w-96 h-96 object-cover' priority/>)}*/}
            {/*<TourInfo tour={tour}/>*/}
            <TourDetails tour={tour} url={UNSPLASH_URL}/>
        </>
    );
};

export default SingleTourPage;
