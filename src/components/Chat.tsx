'use client';

import {
    generateChatResponse,
} from '@/actions/openIA';
import {useMutation} from '@tanstack/react-query';
import {SyntheticEvent, useState} from 'react';
import toast from 'react-hot-toast';
import {useAuth} from '@clerk/nextjs';
import OpenAI from "openai";
import ChatCompletionMessage = OpenAI.ChatCompletionMessage;
import {decreaseTokensById, fetchUserTokensById} from "@/actions/prisma";

const Chat = () => {
    const {userId} = useAuth();

    const [text, setText] = useState('');
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
    const {mutate, isPending} = useMutation({
        mutationFn: async (query: any) => {
             const currentTokens = await fetchUserTokensById(userId!);

            if (currentTokens && currentTokens < 100) {
                toast.error('Token balance too low....');
                return;
            }

            const response = await generateChatResponse([...messages, query]);

            if (!response) {
                toast.error('Something went wrong...');
                return;
            }
            setMessages((prev) => [...prev, response.message]);
             const newTokens = await decreaseTokensById(userId!, response.tokens);
            toast.success(` tokens remaining... ${newTokens}`);
        },
    });
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const query: ChatCompletionMessage = {role: 'user', content: text};
        mutate(query);
        setMessages((prev) => [...prev, query]);
        setText('');
    };

    return (
        <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
            <div>
                {messages.map(({role, content}, index) => {
                    const avatar = role == 'user' ? '👤' : '🤖';
                    const bcg = role === 'user' ? 'bg-base-200' : 'bg-base-100';
                    return (
                        <div
                            key={index}
                            className={`${bcg} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}
                        >
                            <span className='mr-4'>{avatar}</span>
                            <p className='max-w-3xl'>{content}</p>
                        </div>
                    );
                })}
                {isPending ? <span className='loading'></span> : null}
            </div>
            <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
                <div className='join w-full'>
                    <input
                        type='text'
                        placeholder='Message TourPlanningAI'
                        className='input input-bordered join-item w-full'
                        value={text}
                        required
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        className='btn btn-primary join-item'
                        type='submit'
                        disabled={isPending}
                    >
                        {isPending ? 'please wait...' : 'ask question'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Chat;
