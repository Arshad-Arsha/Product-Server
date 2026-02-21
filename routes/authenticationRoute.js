import { Router } from "express";
import { userLogin, userLogout } from "../functions/authenticationFuction.js";

const router = Router();

router.post("/user-login", userLogin); 
router.post("/user-logout", userLogout);


export default router;
