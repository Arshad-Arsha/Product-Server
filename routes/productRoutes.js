import { Router } from "express";
import {
  productCreate,
  productDelete,
  productGet,
  productGetById,
  productUpdate
} from "../functions/productFunction.js";
import { userAuthorization } from "../middleware/userAuthoerizations.js";

const router = Router();


router.post("/create", userAuthorization(["seller", "admin"]), productCreate);
router.get("/get",userAuthorization(["customer","admin","seller"]) ,productGet);
router.get("/get/:id",userAuthorization(["customer","admin","seller"]) , productGetById);
router.put("/update/:id", userAuthorization(["seller", "admin"]), productUpdate);
router.delete("/delete/:id", userAuthorization(["seller", "admin"]), productDelete);

export default router;

