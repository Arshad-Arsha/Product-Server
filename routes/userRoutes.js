import { userCreate, userDelete, userGet, userGetById, userUpdate } from "../functions/userFunction.js";
import { Router } from "express";
import { userAuthorization } from "../middleware/userAuthoerizations.js";

const router = Router();

router.post("/user-create", userCreate);
router.get("/get-data", userAuthorization(["admin"]), userGet);
router.get("/get-data-id", userAuthorization(["admin"]), userGetById);
router.put("/update-data-id/:id", userUpdate);
router.delete("/delete-data-id/:id", userDelete);
export default router;