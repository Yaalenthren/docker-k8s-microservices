const express = require("express");
const cors = require("cors");
const Redis = require("redis");

const app = express();
app.use(cors());
app.use(express.json());

const redisClient = Redis.createClient({ url: "redis://redis:6379" });
redisClient.connect().catch(console.error);

let products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" }
];

app.get("/products", async (req, res) => {
  const cache = await redisClient.get("products");
  if (cache) return res.json(JSON.parse(cache));
  await redisClient.set("products", JSON.stringify(products));
  res.json(products);
});

app.listen(3002, () => console.log("Product service running on 3002"));
