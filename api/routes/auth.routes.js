import { Router } from "express";
import {
  signup,
  signin,
  googleSignin,
} from "../contollers/auth.controllers.js";
import { googleAuthenticator } from "../middlewares/googleAuth.middleware.js";

const route = Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.post("/signin/google", googleAuthenticator, googleSignin);

export default route;
