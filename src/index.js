import dotenv from "dotenv";
import express from "express";
import { router } from "./routes.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/", express.static("www", { maxAge: 3600 * 1000 }));

app.all("*", (req, res) => res.send(404));
app.listen(PORT, () => console.log("Server listening at port " + PORT));
