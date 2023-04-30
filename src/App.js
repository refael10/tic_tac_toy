import { useEffect, useState } from "react";
import Cell from "./components/Cell";

function App() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState(null);

  const sound = new Audio();
  sound.src = "assets/sound.wav";

  const meesage = "it is now " + go + " 's go.";

  const checkScore = () => {
    const winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombo.forEach((array) => {
      let circleWins = array.every((cell) => cells[cell] === "circle");

      if (circleWins) {
        setWinningMessage(<p className='winCircle'>Circle Wins!</p>);
        sound.play();
        return;
      }
    });

    winningCombo.forEach((array) => {
      let crossWins = array.every((cell) => cells[cell] === "cross");

      if (crossWins) {
        setWinningMessage(<p className='winCross'>Cross Wins!</p>);
        sound.play();
        return;
      }
    });
  };

  useEffect(() => {
    checkScore();
  }, [cells]);

  return (
    <div className='app'>
      <div className='gameboard'>
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            setCells={setCells}
            go={go}
            setGo={setGo}
            cells={cells}
            winningMessage={winningMessage}
          />
        ))}
      </div>
      <p>{winningMessage || meesage}</p>
    </div>
  );
}

export default App;
