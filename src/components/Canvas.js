import React from 'react';
import PropTypes from 'prop-types';
import Background from './Background';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Lives from './Lives';
import StartGame from './StartGame';
import Title from './Title';
import Leaderboard from './Leaderboard';
import { signIn } from 'auth0-web';

const Canvas = (props) => {
    const style = {
        border: '0px solid black'
    };

    const gameHeight = 1200;
    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
    const lives = [];
    for (let i = 0; i < props.gameState.lives; i++) {
        const heartPosition = {
            x: -180 - (i * 70),
            y: 35
        };
        lives.push(<Lives key={i} position={heartPosition} />);
    }

    return (
        <svg
            id="react-game-canvas"
            preserveAspectRatio="xMaxYMax none"
            onMouseMove={props.trackMouse}
            onClick={props.shoot}
            style={style}
            viewBox={viewBox}
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" />
                </filter>
            </defs>
            <Background />
            <Ground />
            {props.gameState.cannonBalls.map(cannonBall => (
                <CannonBall key={cannonBall.id} position={cannonBall.position} />
            ))}
            <CannonPipe rotation={props.angle} />
            <CannonBase />
            <CurrentScore score={props.gameState.kills} />
            {lives}
            { ! props.gameState.started &&
                <g>
                    <StartGame onClick={() => props.startGame()} />
                    <Title />
                    <Leaderboard  currentPlayer={props.currentPlayer} authenticate={signIn} leaderboard={props.players} />
                </g>
            }

            { props.gameState.started &&
                <g>
                    {props.gameState.flyingObjects.map(flyingObject => (
                        <FlyingObject
                        key={flyingObject.id}
                        position={flyingObject.position}
                        />
                    ))}
                </g>
            }
        </svg>
    )
}

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,
    gameState: PropTypes.shape({
      started: PropTypes.bool.isRequired,
      kills: PropTypes.number.isRequired,
      lives: PropTypes.number.isRequired,
      flyingObjects: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        }).isRequired,
        id: PropTypes.number.isRequired,
      })).isRequired
    }).isRequired,
    moveObjects: PropTypes.func,
    startGame: PropTypes.func.isRequired,
    currentPlayer: PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
      }),
    players: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    })),
    shoot: PropTypes.func.isRequired
};

Canvas.defaultProps = {
    currentPlayer: null,
    players: null,
};

export default Canvas;