'use server'
import prisma from "@/utils/db";
import {revalidatePath} from "next/cache";

export type Tour = {
    id: string;
    title: string;
    description: string;
    image: string | undefined;
    stops: string[];
    city: string;
    country: string;
    createdAt: Date
    updatedAt: Date
}

export const getExistingTour = async ({city, country}: { city: string, country: string }) => {
    return prisma.tour.findUnique({
        where: {
            city_country: {
                city, country
            }
        }
    })
}

export const createNewTour = async (tour: Tour) => {
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

export const fetchUserTokensById = async (clerkId: undefined | null | string) => {
    const result = await prisma.token.findUnique({where: {clerkId}})
    return result?.tokens;
}

export const createUserByToken = async (clerkId: string) => {
    const result = await prisma.token.create({
        data: {
            clerkId
        }
    })
}

export const fetchOrCreateUserById = async (clerkId: string | null) => {
    const existingUser = await prisma.token.findUnique({where: {clerkId}});
    if (existingUser) {
        return existingUser;
    }
    return (await prisma.token.create({data: {clerkId}}));
}

export const decreaseTokensById = async (clerkId: undefined | null | string, tokens: number | undefined) => {
    const results = await prisma.token.update({
        where: { clerkId },
        data: { tokens: { decrement: tokens } },
    });
    revalidatePath('/profile')
    return results?.tokens
}


