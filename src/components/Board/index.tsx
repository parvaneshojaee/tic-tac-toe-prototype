import { useEffect, useState } from "react";

enum Players {
  X_PLAYER = "X",
  O_PLAYER = "O",
}
function Board() {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<Players>(Players.X_PLAYER);

  const move = (index: number) => {
    setGrid((prev) => {
      const gridCopy = [...prev];
      if (gridCopy[index] === null) {
        gridCopy[index] = playerTurn;
        if (playerTurn === Players.X_PLAYER) {
          setPlayerTurn(Players.O_PLAYER);
        } else {
          setPlayerTurn(Players.X_PLAYER);
        }
      }
      return gridCopy;
    });
  };
  console.log(grid);
  console.log(playerTurn);
  useEffect(() => {
    if (playerTurn === Players.O_PLAYER) {
      const randomNum = Math.floor(Math.random() * (9 - 1) + 1);
      console.log(randomNum);
    }
  }, [playerTurn]);
  return (
    <div className="flex flex-wrap w-[270px]">
      {grid.map((item, index) => (
        <div
          onClick={() => move(index)}
          className="basis-[90px] h-[90px] border-2 border-stone-900"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
export default Board;
