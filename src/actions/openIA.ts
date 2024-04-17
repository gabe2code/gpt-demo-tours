'use server'
import OpenAI from "openai";
import {TourDuration, TourType} from "@/utils/types";

const openAI = new OpenAI({
    apiKey: process.env.OPEN_IA_TOKEN
});


export const generateChatResponse = async (chatMessages: any) => {
    try {
        const response = await openAI.chat.completions.create({
            messages: [
                {role: 'system', content: 'you are a helpful assistant'},
                ...chatMessages,
            ],
            model: 'gpt-3.5-turbo',
            temperature: 0,
            max_tokens: 100,
        });
        return {
            message: response.choices[0].message,
            tokens: response?.usage?.total_tokens,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const generateTourResponse = async ({city, country, tourType, duration}: { city: string, country: string, tourType:TourType, duration: TourDuration }) => {
    const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things ${tourType} can do in this ${city},${country}. 
Once you have a list, create a ${duration} tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "duration": "${duration}",
    "tourType": "${tourType}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
    console.log({query})
    try {
        const response = await openAI.chat.completions.create({
            messages: [
                {role: 'system', content: 'you are a tour guide'},
                {
                    role: 'user',
                    content: query,
                },
            ],
            model: 'gpt-3.5-turbo',
            temperature: 0,
        });

        const tourData = JSON.parse(<string>response.choices[0].message.content);
        if (!tourData.tour) {
            return null
        }
        return {tour: tourData.tour, tokens: response.usage?.total_tokens}
    } catch (error) {
        console.log(error);
        return null;
    }

}


export const generateTourImage = async (city: string, country: string) => {
    try {
        const response = await openAI.images.generate({
            prompt: `a panoramic view of the ${city} ${country}`,
            n: 1,
            size: '512x512'
        })
        return response.data[0].url
    } catch (error) {
        return null;
    }
}
