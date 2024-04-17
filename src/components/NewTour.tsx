'use client'
import {FormEvent} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {generateTourResponse} from "@/actions/openIA";
import toast from "react-hot-toast";
import {createNewTour, decreaseTokensById, fetchUserTokensById, getExistingTour} from "@/actions/prisma";
import {useAuth} from "@clerk/nextjs";
import {TourDuration, TourType} from "@/utils/types";
import TourDetails from "@/components/TourDetails";


const NewTour = ({url}:{url:string}) => {
    const {userId} = useAuth();
    const queryClient = useQueryClient();
    const {mutate, isPending, data: tour} = useMutation({
        mutationFn: async (destination: { city: string, country: string, tourType: TourType, duration: TourDuration }) => {
            // all the functions are together to avoid the timeout in the server functions // 10s +
            const existingTour = await getExistingTour(destination);
            if (existingTour) {
                return existingTour;
            }
            const currentTokens = await fetchUserTokensById(userId!);
            if (currentTokens && currentTokens < 200) {
                toast.error('Insufficient tokens...');
                return null;
            }
            const newTour = await generateTourResponse(destination)
            if (newTour) {
                await createNewTour(newTour.tour);
                await queryClient.invalidateQueries({queryKey: ['tours']})
                const newTokens = await decreaseTokensById(userId!, newTour.tokens)
                toast.success(`${newTokens} tokens remaining...`)
                return newTour.tour
            }
            toast.error('No matching city found');
            return null;
        }
    })
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const tourType = formData.get('tourType') as TourType;
        const duration = formData.get('duration') as TourDuration;
        const destinations = {
            city: formData.get('city') as string,
            country: formData.get('country') as string,
            tourType,
            duration
        };
        mutate(destinations as { city: string, country: string, tourType: TourType, duration: TourDuration })
    }
    if (isPending) {
        return <span className='loading loading-lg'/>
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='max-w-4xl'>
                <h2 className='mb-4'>Select your dream destination</h2>
                <div className='join w-full gap-x-2'>
                    <input
                        type='text'
                        className='input input-bordered join-item w-full'
                        placeholder='city'
                        name='city'
                        required
                    />
                    <input
                        type='text'
                        className='input input-bordered join-item w-full'
                        placeholder='country'
                        name='country'
                        required
                    />
                    <select className='select select-bordered join-item w-full' name='tourType' required>
                        {Object.keys(TourType).map(key => <option key={key} value={key}>{key}</option>)}
                    </select>

                    <select className='select select-bordered join-item w-full' name='duration' required>
                        {Object.keys(TourDuration).map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                    <button className='btn btn-primary join-item' type='submit'>
                        generate tour
                    </button>
                </div>
            </form>
            <div className="mt-16">
                {tour ? <TourDetails tour={tour} url={url}/> : null}
            </div>
        </>

    );
};

export default NewTour;
