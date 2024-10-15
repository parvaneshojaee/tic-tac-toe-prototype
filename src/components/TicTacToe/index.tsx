import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import GameSVG from "../../../public/assets/images/tic. tac.toe..svg";
// import WinnerSVG from "../../../public/assets/images/winner-ribbon.png";
import { useToast } from "@/hooks/use-toast";

enum Players {
  X_PLAYER = "X",
  O_PLAYER = "O",
}
enum GameStates {
  NOT_STARTED,
  IN_PROGRESS,
  OVER,
}

function TicTacToe() {
  const { toast } = useToast();

  const [grid, setGrid] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<Players>(Players.X_PLAYER);
  const [gameState, setGameState] = useState<GameStates>(
    GameStates.NOT_STARTED
  );
//   const [winner, setWinner] = useState<Players | null>(null);

  const moveCount = useMemo(
    () => grid.filter((g) => g !== null).length,
    [grid]
  );

  const move = (index: number) => {
    if (grid[index] !== null || gameState === GameStates.OVER) return;

    setGrid((prev) => {
      const gridCopy = [...prev];
      gridCopy[index] = playerTurn;

      if (playerTurn === Players.X_PLAYER) {
        setPlayerTurn(Players.O_PLAYER);
      } else {
        setPlayerTurn(Players.X_PLAYER);
      }

      return gridCopy;
    });
  };

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
        // setWinner(grid[a] as Players);
        setGameState(GameStates.OVER);
        toast({
          title:
            Players.X_PLAYER === grid[a] ? "Congrats! You won:)" : "Sorry! You Lost:(",
        });
        return;
      }
    }

    if (moveCount === 9 && gameState !== GameStates.OVER) {
      setGameState(GameStates.OVER); // It's a draw
    }
  }, [grid, moveCount]);

  useEffect(() => {
    if (gameState !== GameStates.OVER && playerTurn === Players.O_PLAYER) {
      const timeout = setTimeout(() => {
        let randomNum = Math.floor(Math.random() * 9);
        while (grid[randomNum]) {
          randomNum = Math.floor(Math.random() * 9);
        }
        move(randomNum);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [playerTurn, grid, gameState]);

  return (
    <div className="relative bg-background flex justify-center items-center h-screen">
      <Card className="bg-card w-[350px]">
        <CardHeader>
          <CardTitle className="text-gray-200">{gameState === GameStates.NOT_STARTED && "Let's Play!"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center">
          {grid.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                playerTurn === Players.X_PLAYER && move(index);
              }}
              className="basis-[90px] h-[90px] bg-background rounded-sm m-1 text-gray-100 flex justify-center items-center text-6xl font-bold"
            >
              {item}
            </div>
          ))}
        </CardContent>
        <CardFooter className="text-orange-500 text-2xl font-bold">
        {gameState === GameStates.OVER && "Game is Over!"}
        </CardFooter>
        {/* {gameState === GameStates.OVER && (
          <CardFooter>
            <div className="relative w-full flex justify-center items-center">
              <img src={WinnerSVG} alt="winner" className="w-[400px]" />
              <span className="absolute text-gray-200 text-xl font-bold">
                {winner ? `Winner: Player ${winner}` : "It's a draw!"}
              </span>
            </div>
          </CardFooter>
        )} */}
      </Card>
      <img
        src={GameSVG}
        width="20%"
        alt="img"
        className="absolute bottom-0 left-0"
      />
    </div>
  );
}

export default TicTacToe;
