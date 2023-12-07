const { response } = require("express");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const Redis = require("ioredis");
const redis = new Redis();

app.get("/leader-board", async (req, res) => {
  try {
    let users = await redis.send_command("lrange", "users", 0, -1);
    const usersScores = {};
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      userScore = await redis.send_command("hget", [`${user}`, "score"]);
      usersScores[user] = userScore;
    }

    res.status(200).send(usersScores);
  } catch (e) {
    console.log(e);
    throw ("Failed to fecth data", e);
  }
});

app.get("/game", async (req, res) => {
  try {
    const { user_name } = req.query;
    let isMember = false;
    let users = await redis.send_command("lrange", "users", 0, -1);

    for (let i = 0; i < users.length; i++) {
      if (user_name === users[i]) {
        isMember = true;
        break;
      }
    }

    if (!isMember) {
      const emptyArray = [];
      createUser = await redis.send_command("lpush", ["users", `${user_name}`]);
      insertGame = await redis.send_command("hmset", [
        `${user_name}`,
        "score",
        0,
        "gamecards",
        `${emptyArray}`,
        "hasDefuseCard",
        "false",
        "activeCard",
        null,
      ]);
    }

    let game = await redis.send_command("hgetall", `${user_name}`);
    res.status(200).send(game);
  } catch (e) {
    console.log(e);
    throw ("Failed to fecth data", e);
  }
});

app.post("/game", async (req, res) => {
  try {
    const { gameCards, hasDefuseCard, activeCard, user_name, score } = req.body;
    insertGame = await redis.send_command("hmset", [
      `${user_name}`,
      "gamecards",
      `${gameCards}`,
      "hasDefuseCard",
      `${hasDefuseCard}`,
      "activeCard",
      `${activeCard}`,
      "score",
      `${score}`,
    ]);
    res.status(200).send("inserted");
  } catch (e) {
    console.log(e);
    throw ("Failed to fecth data", e);
  }
});

app.put("/game", async (req, res) => {
  try {
    const { user_name, gameCards, score, hasDefusedCard, activeCard } =
      req.body;
    insertGame = await redis.send_command("hmset", [
      `${user_name}`,
      "gamecards",
      `${gameCards}`,
      "hasDefuseCard",
      hasDefusedCard,
      "activeCard",
      `${activeCard}`,
      "score",
      `${score}`,
    ]);
    res.status(200).send("saved");
  } catch (e) {
    console.log(e);
    throw ("Failed to fecth data", e);
  }
});

app.delete("/game", async (req, res) => {
  try {
    const { user_name } = req.body;
    const emptyArray = [];
    insertGame = await redis.send_command("hmset", [
      `${user_name}`,
      "gamecards",
      `${emptyArray}`,
      "hasDefuseCard",
      "false",
      "activeCard",
      null,
    ]);
    res.status(200).send("reset succesfull");
  } catch (e) {
    console.log(e);
    throw ("Failed to fecth data", e);
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
