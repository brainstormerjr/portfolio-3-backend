import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
const app = express();
const port = 3002;

const corsOptions = {
  // origin: ["http://localhost:3000", "https://haroldkwan.com"],
  origin: ["*"],
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

app.get("/projects", async (req, res) => {
  const projects = JSON.parse(fs.readFileSync("./projects.json", "utf-8"));
  res.send(projects);
});

app.get("/projects/:id", async (req, res) => {
  const projects = JSON.parse(fs.readFileSync("./projects.json", "utf-8"));
  const project = projects.projects.find(
    (p: { id: string }) => p.id === req.params.id
  );
  let markdown = "";
  const markdownPath = path.join("./projects/markdown", `${req.params.id}.md`);
  if (fs.existsSync(markdownPath)) {
    markdown = fs.readFileSync(markdownPath, "utf-8");
  }
  if (project) {
    res.send({ project, markdown });
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

app.get("/blogs", async (req, res) => {
  const blogs = JSON.parse(fs.readFileSync("./blogs.json", "utf-8"));
  res.send(blogs);
});

app.get("/blogs/:id", async (req, res) => {
  const blogs = JSON.parse(fs.readFileSync("./blogs.json", "utf-8"));
  const blog = blogs.blogs.find((p: { id: string }) => p.id === req.params.id);
  let markdown = "";
  const markdownPath = path.join("./blogs/markdown", `${req.params.id}.md`);
  if (fs.existsSync(markdownPath)) {
    markdown = fs.readFileSync(markdownPath, "utf-8");
  }
  if (blog) {
    res.send({ blog, markdown });
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

app.get("/icons", async (req, res) => {
  try {
    const iconFiles = fs
      .readdirSync("./icons")
      .filter((file) => fs.statSync(path.join("./icons", file)).isFile());
    res.json({ icons: iconFiles });
  } catch (err) {
    res.status(500).json({ error: "Unable to read icons directory." });
  }
});

app.use("/projects/images", express.static("./projects/images"));
app.use("/blogs/images", express.static("./blogs/images"));
app.use("/icons", express.static("./icons"));

// app.use("/icons", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "icons", "default.png"));
// });

app.listen(port, () => {
  console.log(`Portfolio-3 Backend listening on port ${port}`);
});
