import { Router } from "express";
import { authenticateUserFromToken } from "../middlewares/userAuth.middleware.js";
import { addMode, deleteMode } from "../contollers/user.controllers.js";

const route = Router();

route.post("/addMode/:id", authenticateUserFromToken, addMode);
route.delete("/deleteMode/:id", authenticateUserFromToken, deleteMode);

export default route;
