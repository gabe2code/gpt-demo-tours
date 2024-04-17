import React from 'react';
import Link from "next/link";
import {Tour} from "@prisma/client";

const TourCard = ({tour}: { tour:Tour }) => {
    const {id,title} = tour
    return (
        <Link href={`/tours/${id}`} className='card card-compact rounded-xl bg-base-100'>
            <div className='card-body items-center text-center'>
                <h2 className='card-title text-center'>{title}</h2>
            </div>
        </Link>
    );
};

export default TourCard;
