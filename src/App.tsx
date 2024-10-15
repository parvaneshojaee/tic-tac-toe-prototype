import "./assets/global.css";
import TicTacToe from "./components/TicTacToe";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div>
      <TicTacToe />
      <Toaster />
    </div>
  );
}

export default App;
