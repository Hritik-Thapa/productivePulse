import { Router } from "express"
import { getTodoList, addListing, editListing, deleteListing, listingComplete } from "../contollers/todos.controller.js";
import { authenticateUserFromToken } from "../middlewares/userAuth.middleware.js";

const route = Router();

route.get("/getList/:userId", authenticateUserFromToken, getTodoList);
route.post("/addListing", authenticateUserFromToken, addListing)
route.delete("/delete/:id", authenticateUserFromToken, deleteListing)
route.put("/edit/:id", authenticateUserFromToken, editListing)
route.put("/complete/:id", authenticateUserFromToken, listingComplete)
export default route;

