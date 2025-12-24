import { suppliers } from "../models/suppliers.js";
import { supplier_bank_details } from "../models/supplier_bank_details.js";
import { supplier_gst_details } from "../models/supplier_gst_details.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup_send_otp = async (req) => {
    try {
        const { number } = req.query;
        console.log("number==> 9220774381")
        if (!number) {
            return { status: "failure", msg: "Invalid Number!" }
        }
        // console.log("from seller_const")
        // const number = req.user.number;
        // var otp = await otp_fns.getOTP();
        let otp = 123456
        // const data = await sellers.update({ otp }, { where: { number } })
        const supplier_exist = await suppliers.findOne({ where: { number } })
        if (supplier_exist) {
            return { status: "success", msg: "Already Registered!" }
        } else {
            const update_supplier = await suppliers.create({
                otp: otp,
                number: number,
            })
            if (update_supplier) {
                return { status: "success", msg: "OTP Sent!" }
            } else {
                return { status: "failure", msg: "Something went wrong!" }
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: "failure",
            msg: "Something went wrong!",
        }
    }
}

export const signup = async (req) => {
    try {
        const { otp, email, password, number } = req.body;

        if (!otp || !email || !password || !number) {
            return { success: false, error: "All fields are required!" };
        }

        const verify_otp = await suppliers.findOne({ where: { number, otp } })


        if (!verify_otp) {
            return { success: false, error: "Invalid OTP!" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await suppliers.update({ email, password: hashedPassword }, { where: { number } });
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const signup_verify_otp = async (req, number, login_from) => {
    try {
        if (!req.body.OTP) {
            return { status: "failure", msg: "Invalid OTP!" }
        }
        const error_otp = await otp_fns.getOTP()
        const supplier_exist = await suppliers.findOne({ where: { number } })
        if (supplier_exist) {
            if (req.body.OTP == supplier_exist.otp) {
                const ot = await otp_fns.getOTP()
                const update_supplier = await suppliers.update(
                    { signup_otp_status: true, verified: true, otp: ot },
                    {
                        where: {
                            number,
                        },
                    }
                )
                if (update_supplier[0]) {
                    if (login_from !== null) {
                        const ip_dt = constant.get_ip_device(req)
                        await suppliers_login_history.create({
                            supplier_id: supplier_exist.supplier_id,
                            email: supplier_exist.email,
                            login_from: login_from,
                            ip: ip_dt.ip,
                            device: ip_dt.device,
                            browser: ip_dt.device_browser,
                        })
                        return { status: "success" }
                    } else {
                        return { status: "success", supplier_id: supplier_exist.supplier_id }
                    }
                } else {
                    await suppliers.update({ otp: error_otp }, { where: { number } })
                    return { status: "failure", msg: "Something went wrong!" }
                }
            } else {
                await suppliers.update({ otp: error_otp }, { where: { number } })
                return { status: "failure", msg: "Incorrect OTP!" }
            }
        } else {
            return { status: "failure", msg: "Supplier Not Exist!" }
        }
    } catch (e) {
        console.log(e)
        return {
            status: "failure",
            msg: catch_error_msg,
        }
    }
}

export const login = async (req, res) => {
    try {
        const { emailOrNumber, password } = req.body;
        console.log(req.body);

        const supplier = await suppliers.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrNumber },
                    { number: emailOrNumber }
                ]
            }
        });
        console.log(supplier.password);

        const isMatch = await bcrypt.compare(password, supplier.password);

        if (!isMatch) {
            return { success: false, error: "Invalid Credentials!" };
        }

        // 🔑 Tokens
        const accessToken = jwt.sign(
            { supplierId: supplier.supplier_id },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { supplierId: supplier.supplier_id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        // 🍪 Cookies
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return { success: true, data: supplier };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
export const profile = async (req, parameters) => {
    try {
        const supplier = await suppliers.findOne({ where: { id: req.user.id } });
        return { success: true, data: supplier };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
export const updateProfile = async (req, parameters) => {
    try {
        const supplier = await suppliers.update(req.body, { where: { id: req.user.id } });
        return { success: true, data: supplier };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const updatePassword = async (req, parameters) => {
    try {
        const supplier = await suppliers.update(req.body, { where: { id: req.user.id } });
        return { success: true, data: supplier };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const add_bank_details = async (body_data, supplierId) => {
    try {
        if (!body_data.bank_name || !body_data.account_number || !body_data.ifsc_code || !body_data.branch_name) {
            return { success: false, error: "All fields are required!" };
        }
        const { bank_name, account_number, ifsc_code, branch_name, supplierId } = body_data;

        const is_exist = await supplier_bank_details.findOne({ where: { supplier_id: supplierId } });

        console.log(is_exist);

        if (is_exist) {
            return { success: false, msg: "Bank Details exist!" };
        } else {
            const data = await supplier_bank_details.create({ bank_name, account_number, ifsc_code, branch_name, supplier_id: supplierId });
            await supplier_bank_details.update({ bank_details_status: true }, { where: { supplier_id: supplierId } });
            if (data) {
                return { success: true, data: data };
            } else {
                return { success: false, msg: "Bank Details not added!" };
            }
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const add_gst_details = async (body_data, supplierId) => {
    try {
        if (!body_data.gst_number || !body_data.pan_number) {
            return { success: false, error: "All fields are required!" };
        }
        const { gst_number, gst_name, pan_number, supplierId } = body_data;
        
        console.log(body_data);

        const panImg = body_data.pan_image || "";
        const gstImg = body_data.gst_image || "";

        const is_exist = await supplier_gst_details.findOne({ where: { supplier_id: supplierId } });

        if (is_exist) {
            return { success: false, msg: "GST Details exist!" };
        } else {
            const data = await supplier_gst_details.create({ gst_number, gst_name, pan_number, pan_image: panImg, gst_image: gstImg, supplier_id: supplierId });
            await supplier_gst_details.update({ gst_validity: new Date(), gst_details_status: true }, { where: { supplier_id: supplierId } });
            if (data) {
                return { success: true, data: data };
            } else {
                return { success: false, msg: "GST Details not added!" };
            }
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const getAllSupplier = async () => {
    try {
        const result = await suppliers.findAll();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


