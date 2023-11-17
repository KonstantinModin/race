import React from 'react';
import Item from '../item';
import { map, emptyEpisode } from './map';

import './index.css';

const fieldHeight = 16;
const fieldWidth = 15;

const Field = () => {
  const [currentEpisodeIdx, setCurrentEpisodeIdx] = React.useState(0);
  const [firstLineIdx, setFirstLineIdx] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(true);
  const [carPosition, setCarPosition] = React.useState(fieldWidth >> 1);

  const currentEpisodeFrame = map[currentEpisodeIdx].slice(
    firstLineIdx,
    firstLineIdx + fieldHeight
  );
  const currentEpisodeFrameLength = currentEpisodeFrame.length;
  const nextEpisodeFrame = (map[currentEpisodeIdx + 1] || emptyEpisode).slice(
    0,
    fieldHeight - currentEpisodeFrameLength
  );

  const gameFrame = [...currentEpisodeFrame, ...nextEpisodeFrame].reverse();
  const collision = gameFrame[fieldHeight - 2][carPosition] > 4;

  React.useEffect(() => {
    if (collision) {
      setGameStarted(false);
    }

    let timer;
    if (gameStarted && !collision) {
      timer = setTimeout(() => {
        if (firstLineIdx < map[currentEpisodeIdx].length) {
          setFirstLineIdx(firstLineIdx + 1);
        } else if (currentEpisodeIdx < map.length - 1) {
          setFirstLineIdx(1);
          setCurrentEpisodeIdx(currentEpisodeIdx + 1);
        } else {
          // end of map
          setGameStarted(false);
        }
      }, 100);
    } else {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [firstLineIdx, currentEpisodeIdx, gameStarted, collision]);

  React.useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      //arrow-left
      if (keyCode === 37) {
        setCarPosition(carPosition ? carPosition - 1 : 0);
        //arrow-right
      } else if (keyCode === 39) {
        setCarPosition(
          carPosition < fieldWidth - 1 ? carPosition + 1 : carPosition
        );
      }
    };
    if (gameStarted) {
      window.addEventListener('keydown', keyHandler);
    }
    return () => window.removeEventListener('keydown', keyHandler);
  }, [carPosition, gameStarted]);

  const renderItem = (item, idxX, idxY) => {
    if (idxY === fieldHeight - 2 && idxX === carPosition) {
      return <Item key={idxX} itemCode={collision ? 2 : 1} />;
    }
    return <Item key={idxX} itemCode={item} />;
  };

  const newGameHandler = () => {
    setCurrentEpisodeIdx(0);
    setFirstLineIdx(0);
    setGameStarted(true);
    setCarPosition(fieldWidth >> 1);
  };

  return (
    <div className="Field">
      <h2>Race</h2>
      <button onClick={newGameHandler}>New Game</button>
      <h6>gameStarted: {gameStarted.toString()}</h6>
      <h6>carPosition: {carPosition}</h6>
      <h6>currentEpisodeIdx: {currentEpisodeIdx}</h6>
      <h6>firstLineIdx: {firstLineIdx}</h6>
      <div className="Field-content">
        {gameFrame.map((row, idxY) => (
          <div className="Field-row" key={idxY + Math.random()}>
            {row.map((item, idxX) => renderItem(item, idxX, idxY))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Field;
