import express from "express";
import http from "http";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import connect from "./utils/connect";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use("/", routes);
app.use(errorHandler);
app.use(notFound);

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(colors.bold.green("listening"));
});

server.on("listening", async () => {
  await connect();
});

export default server;
