import express from "express";
import dotenv from "dotenv";
import notionRoutes from "./routes/notion.route.js"
import cors from "cors"

dotenv.config({
  path: "./.env",
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8000;

const app = express();



// some middlewares
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))


// routes declaration
app.use("/api/v1/notion", notionRoutes);




app.listen(port, ()=>{
    console.log(`Server is running on http://${host}:${port}`);
});
