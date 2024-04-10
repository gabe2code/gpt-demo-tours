import React from 'react';
import {auth, UserProfile} from "@clerk/nextjs";
import {fetchUserTokensById} from "@/actions/prisma";

const ProfilePage = () => {
    const {userId} = auth();
    const tokens = userId ? fetchUserTokensById(userId): 0
    return (
        <div>
            {tokens &&<h1 className='mb-6 ml-6 text-xl font-extrabold'>
                Token Amount: {tokens}
            </h1>}
           <UserProfile/>
        </div>
    );
};

export default ProfilePage;
