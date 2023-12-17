import React from "react";
import { useSelector } from "react-redux";

function Leaderboard() {
  const users = useSelector((state) => state.leaderBoard?.userScores);
  const userName = useSelector((state) => state.gameState?.userName);
  const score = useSelector((state) => state.gameState?.score);

  return (
    <div style={{ flex: 1 }}>
      <h1 style={{ textAlign: "center" }}>Leaderboard</h1>
      {users &&
        Object.keys(users).map((user) => {
          return (
            <div
              style={{
                borderBottom: "2px solid",
                margin: "10px",
                padding: "3px",
                display: "flex",
              }}
            >
              <div className="equi">{user}: </div>
              {user === userName ? (
                <div className="equi">{score} </div>
              ) : (
                <div className="equi">{users[user]} </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default Leaderboard;
