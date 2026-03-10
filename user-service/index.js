const express = require("express");
const cors = require("cors");
const Redis = require("redis");

const app = express();
app.use(cors());
app.use(express.json());

const redisClient = Redis.createClient({ url: "redis://redis:6379" });
redisClient.connect().catch(console.error);

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

app.get("/users", async (req, res) => {
  const cache = await redisClient.get("users");
  if (cache) return res.json(JSON.parse(cache));
  await redisClient.set("users", JSON.stringify(users));
  res.json(users);
});

app.listen(3001, () => console.log("User service running on 3001"));
