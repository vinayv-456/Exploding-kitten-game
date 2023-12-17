import "./App.css";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import Leaderboard from "./components/leaderboard/Leaderboard";
import { useActions } from "./hooks/useActions";
import Game from "./components/game/Game";

function App() {
  const userName = useSelector((state) => state.gameState?.userName);
  const cards = useSelector((state) => state.gameState?.gameCards);
  const { requestGameState, getLeaderBoard, setUserName } = useActions();

  useEffect(() => {
    // prompt to enter userName
    const enterName = () => {
      if (!userName) {
        let name = prompt("enter your name!");
        setUserName(name);
        return name;
      }
    };
    // fetch the game state of the user
    requestGameState({ userName: enterName() });
    console.log("fetching leaderboard");
    getLeaderBoard();
  }, []);

  console.log("cards", cards);

  return (
    <>
      <div className="container" style={{ display: "flex" }}>
        <Game />
        <Leaderboard />
      </div>
    </>
  );
}
export default App;
