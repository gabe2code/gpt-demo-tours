'use server'
import prisma from "@/utils/db";
import {revalidatePath} from "next/cache";
import {TourDuration, TourType} from "@/utils/types";


export const getExistingTour = async ({city, country, tourType, duration}: { city: string, country: string, tourType: TourType, duration: TourDuration }) => {
    return prisma.tour.findUnique({
        where: {
            city_country_tourType_duration: {
                city, country, tourType, duration
            }
        }
    })
}

export const createNewTour = async (tour: any) => {
    return prisma.tour.create({
        data: tour
    })
}

export const getTours = async (searchTerm?: string) => {
    const searchFilter = searchTerm ? {
        OR: [
            {city: {contains: searchTerm}},
            {country: {contains: searchTerm}},
        ],
    } : {};

    return prisma.tour.findMany({
        where: searchFilter,
        orderBy: {
            city: 'asc',
        },
    });
}

export const getSingleTour = async (id: string) => {
    return prisma.tour.findUnique({
        where: {
            id,
        },
    });
}

export const fetchUserTokensById = async (clerkId: undefined | string) => {
    const result = await prisma.token.findUnique({where: {clerkId}})
    return result?.tokens;
}

export const createUserByToken = async (clerkId: string) => {
    const result = await prisma.token.create({
        data: {
            clerkId
        }
    })
    return result?.tokens;
}

export const fetchOrCreateUserById = async (clerkId: string) => {
    const existingUserTokens = await fetchUserTokensById(clerkId);
    if (existingUserTokens) {
        return existingUserTokens;
    }
    return (createUserByToken(clerkId));
}

export const decreaseTokensById = async (clerkId: undefined | string, tokens: number | undefined) => {
    const results = await prisma.token.update({
        where: { clerkId },
        data: { tokens: { decrement: tokens } },
    });
    revalidatePath('/profile')
    return results?.tokens
}


