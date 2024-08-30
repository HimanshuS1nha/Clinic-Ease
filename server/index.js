import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(port, () => console.log(`Running at http://localhost:${port}`));
