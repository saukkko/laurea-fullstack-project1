import express from "express";
import helmet from "helmet";
import { router } from "./routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Tells browser to cache static content for maximum of 8 hours
app.use(express.static("./static", { maxAge: 3600 * 1000 * 8 }));

app.all("*", (req, res) => res.status(404).end());

app.listen(PORT, () => console.log("Server listening at port " + PORT));
