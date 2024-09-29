import {Router} from "express"
import { getTodoList,addListing } from "../contollers/todos.controller.js";
import { authenticateUserFromToken } from "../middlewares/userAuth.middleware.js";

const route=Router();

route.get("/getList/:userId",authenticateUserFromToken,getTodoList);
route.post("/addListing",authenticateUserFromToken,addListing)
export default route;

