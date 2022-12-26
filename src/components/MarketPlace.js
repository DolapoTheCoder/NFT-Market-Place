import React from 'react';
import MenuBar from './MenuBar';
import {useSelector} from 'react-redux';

const MarketPlace = () => {
    const state = useSelector((state) => state);
    console.log('MarketPlace State:', state.user)
    return (
        <div>
            <MenuBar/>
            <div>
                MarketPlace
            </div>
        </div>
    )
}

export default MarketPlace