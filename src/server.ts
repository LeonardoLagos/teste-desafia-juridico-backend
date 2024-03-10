import cors from "cors";
import express from "express";
import routes from "./routes/clients.routes";

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(PORT, () => console.log("server running on port", PORT));