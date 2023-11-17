import Game from "./components/game";

import "./App.css";

const arr = [
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
  ["g", "k", "l"],
  ["m", "n", "o"],
];

const rot = (arr) =>
  arr[0].map((_, x) => arr.map((_, y) => arr[arr.length - 1 - y][x]));

const contr = (arr) =>
  arr[0].map((_, x) => arr.map((_, y) => arr[y][arr[0].length - x - 1])); //.reverse();

const show = (arr) => {
  arr.forEach((item) => console.log(item.join`-`));
};

show(arr);

show(rot(arr));
show(contr(arr));

const App = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
};

export default App;
