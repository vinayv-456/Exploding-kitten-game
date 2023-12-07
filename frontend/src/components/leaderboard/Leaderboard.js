import React from "react";
import { useSelector } from "react-redux";

function Leaderboard() {
  const users = useSelector((state) => state.leaderBoard?.userScores);
  const user_name = useSelector((state) => state.gameState?.user_name);
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
              {user === user_name ? (
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
