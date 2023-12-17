import "./App.css";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Cards from "./components/game/Game";
import { useActions } from "./hooks/useActions";
import { generateRandomCards } from "./utilis/utilis";
import Game from "./components/game/Game";

function App() {
  const userName = useSelector((state) => state.gameState?.userName);
  const cards = useSelector((state) => state.gameState?.gameCards);
  const isPending = useSelector((state) => state.gameState?.isPending);
  const score = useSelector((state) => state.gameState?.score);
  const hasDefusedCard = useSelector(
    (state) => state.gameState?.hasDefusedCard
  );
  const activeCard = useSelector((state) => state.gameState?.activeCard);
  const users = useSelector((state) => state.leaderBoard?.userScores);
  const { requestGameState, setGameState, getLeaderBoard, setUserName } =
    useActions();

  useEffect(() => {
    // prompt to enter unser_name
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

  useEffect(() => {
    const deckOfCards = () => {
      if (!cards || cards?.length === 0) {
        const obj = {
          gameCards: generateRandomCards(),
          hasDefuseCard: false,
          activeCard: null,
          userName: userName,
          score: score,
        };
        console.log("setting game object");
        setGameState(obj);
      }
    };
    if (!isPending) {
      deckOfCards();
    }
  }, [isPending]);

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
