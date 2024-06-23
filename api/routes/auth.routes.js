import { Router } from "express";
import { signup, signin } from "../contollers/auth.controllers.js";

const route = Router();

route.post("/signup", signup);
route.post("/signin", signin);

export default route;
