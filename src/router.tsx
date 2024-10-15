import { createBrowserRouter } from "react-router-dom";
import WelcomeHeader from "./components/TicTacToe";

 const routes = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeHeader />,
  },
]);

export default routes;
