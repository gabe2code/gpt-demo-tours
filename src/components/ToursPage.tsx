'use client'
import {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getTours, Tour} from "@/actions/prisma";
import TourList from "@/components/TourList";

const ToursPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const {data, isPending} = useQuery({
        queryKey: ['tours', searchValue],
        queryFn: () => getTours(searchValue)
    })
    return (
        <>
            <form className='max-w-lg mb-12'>
                <div className="join w-full">
                    <input type="text" className='input input-bordered join-item w-full' value={searchValue}
                           onChange={(e) => setSearchValue(e.target.value)}
                           required/>
                    <button className="btn btn-primary join-item" type='button'>Reset</button>
                </div>
            </form>
            {isPending ? <span className='loading'/> : <TourList tours={data as unknown as Tour[]}/>}
        </>
    );
};

export default ToursPage;
