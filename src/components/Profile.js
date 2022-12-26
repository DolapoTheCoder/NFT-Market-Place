import React from 'react';
import MenuBar from './MenuBar';
import {useSelector} from 'react-redux';

const Profile = () => {
    const state = useSelector((state) => state);
    console.log('MarketPlace State:', state.user)

    return (
        <div>
            <div>
                Profile
            </div>
        </div>
    )
}

export default Profile