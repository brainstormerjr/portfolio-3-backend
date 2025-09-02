import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();
const port = 3002;

const corsOptions = {
  origin: ["http://localhost:3000", "https://haroldkwan.com"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server for haroldkwan.com running as expected.");
});

app.get("/work-experiences", async (req, res) => {
  const experiences = JSON.parse(
    fs.readFileSync("./work-experiences.json", "utf-8")
  );
  res.send(experiences);
});

app.get("/other-experiences", async (req, res) => {
  const experiences = JSON.parse(
    fs.readFileSync("./other-experiences.json", "utf-8")
  );
  res.send(experiences);
});

app.get("/education", async (req, res) => {
  const education = JSON.parse(fs.readFileSync("./education.json", "utf-8"));
  res.send(education);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
