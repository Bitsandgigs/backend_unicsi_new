import express from "express";
const router = express.Router();

import supplierController from "../controllers/supplierController.js";

router.post("/send-otp", supplierController.supplier_send_otp);
router.post("/verify-otp", supplierController.supplier_verify_otp);
router.post("/register", supplierController.supplier_register);
router.post("/login", supplierController.supplier_login);
router.post("/stores/bankAccountDetails", supplierController.supplier_bank_account_details);
router.post("/stores/gstDetails", supplierController.supplier_gst_details);
router.get("/getAllSupplier", supplierController.getAllSupplier);



export default router;


// import express from "express";
// const router = express.Router();
// // import { auth, requireRole } from "../middlewares/auth";
// import supplierController from "../controllers/supplierController";
// // import supplierFnc from "../utils/supplierFnc";

// router.post("/send-otp", supplierController.supplier_send_otp);
// router.post("/verify-otp", supplierController.supplier_verify_otp);
// router.post("/signup", supplierController.supplier_signup);
// router.post("/login", supplierController.supplier_login);
// // router.get("/profile", auth, requireRole("supplier"), supplierController.supplier_profile);
// // router.put("/profile", auth, requireRole("supplier"), supplierController.supplier_update_profile);
// // router.put("/password", auth, requireRole("supplier"), supplierController.supplier_update_password);

// export default router;  
