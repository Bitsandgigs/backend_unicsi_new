import { signup, login, profile, signup_send_otp, add_bank_details, add_gst_details, getAllSupplier } from "../utils/supplierFnc.js";

class SupplierController {

    async supplier_register(req, res) {
        try {
            console.log(req.body);
            const result = await signup(req);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async supplier_send_otp(req, res) {
        try {
            const result = await signup_send_otp(req);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async supplier_verify_otp(req, res) {
        try {
            const result = await signup(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async supplier_login(req, res) {
        try {
            const result = await login(req, res);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async supplier_profile(req, res) {
        try {
            const result = await profile(req);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async supplier_update_profile(req, res) {
        try {
            const result = await profile(req);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async supplier_update_password(req, res) {
        try {
            const result = await profile(req);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async supplier_update_profile(req, res) {
        try {
            const result = await profile(req);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    async supplier_update_password(req, res) {

    }

    async supplier_bank_account_details(req, res) {
        try {
            const result = await add_bank_details(req.body, req.params.supplierId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async supplier_gst_details(req, res) {
        try {
            const result = await add_gst_details(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllSupplier(req, res) {
        try {
            const result = await getAllSupplier();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new SupplierController();
