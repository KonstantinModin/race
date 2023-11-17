import React from 'react';
// import coinGif from '../../img/coin.gif';

import './index.css';

const car = '🚗';
const collision = '🤬';
const coin = '💰';
const pine = '🎄';
const cactus = '🌵';
const palm = '🌴';
const oak = '🌳';
const pineNY = '🎄';
const tiger = '🐯';
const finish = '👍';
const emptySpace = null;

const Item = ({ itemCode }) => {
  const renderItem = () => {
    switch (itemCode) {
      case 1:
        return car;
      case 2:
        return collision;
      case 4:
        return coin;
      case 5:
        return pine;
      case 6:
        return cactus;
      case 7:
        return palm;
      case 8:
        return oak;
      case 9:
        return pineNY;
      case 10:
        return tiger;
      case 11:
        return finish;
      default:
        return emptySpace;
    }
  };

  return (
    <div className="Item">
      <div className="Item-content">{renderItem()}</div>
    </div>
  );
};

export default Item;
