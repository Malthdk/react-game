import React from 'react';
import { skyAndGroundWidth } from '../utils/constants';

const Background = () => {
    const backgroundStyle= {
        fill: '#30abef'
    }
    const backgroundWidth = skyAndGroundWidth;
    const gameHeight = 1200;
    return (
        <rect
            style={backgroundStyle}
            x={backgroundWidth / -2}
            y={100 - gameHeight}
            width={backgroundWidth}
            height={gameHeight}
        />
    );
};

export default Background;