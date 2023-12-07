import "./App.css";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Cards from "./components/game/Game";
import { useActions } from "./hooks/useActions";
import { generateRandomCards } from "./utilis/utilis";
import Game from "./components/game/Game";

function App(props) {
  const user_name = useSelector((state) => state.gameState?.user_name);
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
    const enterName = () => {
      if (!user_name) {
        let name = prompt("enter your name!");
        setUserName(name);
        return name;
      }
    };
    let userName = enterName();
    requestGameState({ user_name: userName });
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
          user_name: user_name,
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
