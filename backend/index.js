import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import { connect2DB } from "./src/models/index.js";
import { userRoutes } from "./src/routes/userRouter.js";
import { tweetRoutes } from "./src/routes/tweetRouter.js";
import { commentRoutes } from "./src/routes/commentRouter.js";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";

// const bodyParser = bodyParser();

dotenv.config();

const PORT = process.env.PORT || 3011;
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));

// Increase URL-encoded payload limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use(cors());

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Internal Server Error");
// });

const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
const isFrontendLocalhost =
  process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

// re-configure cors middleware
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));
/////////// add parser for cookies
app.set("trust proxy", 1); // trust first proxy
const cookieSessionOptions = {
  name: "session",
  secret: cookieSessionSecret, // frei wählbar
  httpOnly: true,
  expires: new Date(Date.now() + twoWeeksInMs),
  sameSite: isFrontendLocalhost ? "lax" : "none",
  secure: isFrontendLocalhost ? false : true,
};
app.use(cookieSession(cookieSessionOptions));
app.use(morgan("dev"));
app.use(express.json());
// app.use(express.bodyParser({ limit: "50mb" }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweets", tweetRoutes);
app.use("/api/v1/comments", commentRoutes);

try {
  await connect2DB();
  app.listen(PORT, () => {
    console.log("Server listening at port: ", PORT);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
