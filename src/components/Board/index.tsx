import { useEffect, useMemo, useState } from "react";

enum Players {
  X_PLAYER = "X",
  O_PLAYER = "O",
}
enum GameStates {
  NOT_STARTED,
  IN_PROGRESS,
  OVER,
}
function Board() {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<Players>(Players.X_PLAYER);
  const [gameState, setGameState] = useState<GameStates>(
    GameStates.NOT_STARTED
  );

  const moveCount = useMemo(
    () => grid.filter((g) => g !== null).length,
    [grid]
  );

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

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      if (
        playerTurn === Players.O_PLAYER &&
        gameState !== GameStates.OVER &&
        moveCount !== 9
      ) {
        let randomNum = Math.floor(Math.random() * (9 - 1) + 1);
        while (grid[randomNum]) {
          randomNum = Math.floor(Math.random() * (9 - 1) + 1);
        }
        move(randomNum);
      }
    }, 1000);
    return () => timeout && clearTimeout(timeout);
  }, [playerTurn, moveCount, gameState]);

  useEffect(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        console.log(grid[a]);
        setGameState(GameStates.OVER);
      }
    }
  }, [grid]);
  return (
    <div className="flex flex-wrap w-[270px]">
      {grid.map((item, index) => (
        <div
          onClick={() => {
            playerTurn === Players.X_PLAYER && move(index);
          }}
          className="basis-[90px] h-[90px] border-2 border-stone-900"
        >
          {item}
        </div>
      ))}
      {gameState === GameStates.OVER && <h1>DONE</h1>}
    </div>
  );
}
export default Board;
