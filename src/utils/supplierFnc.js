import { Supplier, ProductImage, Product, ProductVariant, Warehouse, Inventory,supplier_bank_details } from "../models/index.js";
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
        const supplier_exist = await Supplier.findOne({ where: { number } })
        if (supplier_exist) {
            return { status: "success", msg: "Already Registered!" }
        } else {
            const update_supplier = await Supplier.create({
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

        const verify_otp = await Supplier.findOne({ where: { number, otp } })


        if (!verify_otp) {
            return { success: false, error: "Invalid OTP!" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await Supplier.update({ email, password: hashedPassword }, { where: { number } });
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
        const supplier_exist = await Supplier.findOne({ where: { number } })
        if (supplier_exist) {
            if (req.body.OTP == supplier_exist.otp) {
                const ot = await otp_fns.getOTP()
                const update_supplier = await Supplier.update(
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
                    await Supplier.update({ otp: error_otp }, { where: { number } })
                    return { status: "failure", msg: "Something went wrong!" }
                }
            } else {
                await Supplier.update({ otp: error_otp }, { where: { number } })
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

        const supplier = await Supplier.findOne({
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

export const logout = async (req, res) => {
    try {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return { success: true, message: "Logged out successfully" };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


export const profile = async (req) => {
    try {

        // get supplier id from token
        const { supplierId, role } = req.user;

        console.log(supplierId, role);

        if(!supplierId || !role) {
            return { success: false, error: "Unauthorized" };
        }

        if(role !== "SUPPLIER") {
            return { success: false, error: "Unauthorized" };
        }
        
        // get supplier details
        const supplier = await Supplier.findOne({ where: { supplier_id: supplierId } });
        
        // check if supplier exists
        if(!supplier) {
            return { success: false, error: "Supplier not found" };
        }
        return { success: true, data: supplier };
    } catch (error) {
        return { success: false, error: error.message };
    }
};



export const updateProfile = async (req) => {
    try {
        const { supplierId, role } = req.user;

        if(role !== "supplier") {
            return { success: false, error: "Unauthorized" };
        }
        
        const supplier = await Supplier.update(req.body, { where: { supplier_id: supplierId } });
        return { success: true, data: supplier };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const updatePassword = async (req) => {
    try {
        const { supplierId, role } = req.user;

        if(role !== "supplier") {
            return { success: false, error: "Unauthorized" };
        }
        
        const supplier = await Supplier.update(req.body, { where: { supplier_id: supplierId } });
        return { success: true, data: supplier };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const add_bank_details = async (req) => {
    try {
        const { supplierId, role } = req.user;

        if(role !== "SUPPLIER") {
            return { success: false, error: "Unauthorized" };
        }

        if(!supplierId) {
            return { success: false, error: "Unauthorized" };
        }
        
        if (!req.body.holderName || !req.body.accountNumber || !req.body.reAccountNumber || !req.body.ifsc) {
            return { success: false, error: "All fields are required!" };
        }

        const { holderName, accountNumber, reAccountNumber, ifsc } = req.body;

        const payload = {
            account_number : accountNumber,
            ifsc_code : ifsc,
            account_holder_name : holderName,
            bank_name : "",
            supplier_id : supplierId,
            branch_name : ""
        }

        // const is_exist = await supplier_bank_details.findOne({ where: { supplier_id: supplierId } });

        console.log(payload);

        const data = await supplier_bank_details.create(payload);
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Bank Details not added!" };
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
        const result = await Supplier.findAll();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


export const upload_products = async (body_data) => {
    try {
        if (!body_data.title || !body_data.description || !body_data.brand || !body_data.approval_status) {
            return { success: false, error: "All fields are required!" };
        }
        const { supplier_id, title, description, brand, approval_status } = body_data;
        const data = await Product.create({ supplier_id, title, description, brand, approval_status });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Product not added!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}


export const upload_product_variants = async (req) => {
    try {
        const product_id = req.params.product_id;
        if (!product_id || !req.body.variant_name || !req.body.variant_price || !req.body.variant_stock) {
            return { success: false, error: "All fields are required!" };
        }
        req.body.product_id = product_id;
        const data = await ProductVariant.create(req.body);
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Product Variant not added!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}


export const add_product_images = async (req) => {
    try {
        const { variant_id } = req.params;

        if (!variant_id) {
            return { success: false, error: "variant_id is required" };
        }

        if (!req.files || req.files.length === 0) {
            return { success: false, error: "No images uploaded" };
        }

        // Build image records
        const imagesPayload = req.files.map((file, index) => {
            const publicPath = `uploads/images/${file.filename}`.replace(/\\/g, "/");

            return {
                variant_id,
                image_url: `${req.protocol}://${req.get("host")}/${publicPath}`,
                sort_order: index,
            };
        });

        await ProductImage.bulkCreate(imagesPayload);

        return {
            success: true,
            data: imagesPayload,
        };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
};

export const create_warehouse = async (req) => {
    try {
        const { supplier_id, name, address, city, state, pincode } = req.body;
        const data = await Warehouse.create({ supplier_id, name, address, city, state, pincode });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Warehouse not added!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const update_warehouse = async (req) => {
    try {
        const { warehouse_id } = req.params;
        const { name, address, city, state, pincode } = req.body;
        // fetch data updated
        const data = await Warehouse.updateandFetch({ name, address, city, state, pincode }, { where: { warehouse_id } });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Warehouse not updated!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const get_warehouse = async (req) => {
    try {
        const { warehouse_id } = req.params;
        const data = await Warehouse.findAll({ where: { warehouse_id } });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Warehouse not found!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}


export const delete_warehouse = async (req) => {
    try {
        const { warehouse_id } = req.params;
        // soft delete
        const data = await Warehouse.update({ is_active: false }, { where: { warehouse_id } });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Warehouse not deleted!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const create_inventory = async (req) => {
    try {
        const { sku, warehouse_id, available_stock, reserved_stock } = req.body;
        const data = await Inventory.create({ sku, warehouse_id, available_stock, reserved_stock });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Inventory not added!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}


export const update_inventory_stock = async (req) => {
    try {
        const { inventory_id } = req.params;
        const { quantity, action } = req.body;
        const inventory = await Inventory.findOne({ where: { inventory_id } });
        if (!inventory) {
            return { success: false, msg: "Inventory not found!" };
        }
        if (action === "add") {
            inventory.available_stock += quantity;
        } else if (action === "deduct") {
            //(>=0 check)
            if (inventory.available_stock < quantity) {
                return { success: false, msg: "Not enough stock!" };
            }
            inventory.available_stock -= quantity;
        }
        const data = await Inventory.update({ available_stock: inventory.available_stock }, { where: { inventory_id } });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Inventory not updated!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const get_inventory = async (req) => {
    try {
        const { sku } = req.params;
        const data = await Inventory.findAll({ where: { sku } });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Inventory not found!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const delete_inventory = async (req) => {
    try {
        const { inventory_id } = req.params;
        // soft delete
        const data = await Inventory.update({ is_active: false }, { where: { inventory_id } });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Inventory not deleted!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}


export const get_inventory_by_filter = async (req) => {
    try {
        const { filter } = req.query;
        console.log(filter);
        //in-stock(> 0)
        //out-of-stock(= 0)
        //Inactive(is_active = false)
        //All
        //search sku
        //low stock(< 10)
        const filterData = {
            is_active: true
        }
        if (filter === "in-stock") {
            filterData.available_stock = { [Op.gt]: 0 };
        } else if (filter === "out-of-stock") {
            filterData.available_stock = { [Op.eq]: 0 };
        } else if (filter === "inactive") {
            filterData.is_active = false;
        } else if (filter === "all") {
            filterData.is_active = true;
        }

        if (req.query.search) {
            filterData.sku = { [Op.like]: `%${req.query.search}%` };
        }
        if (req.query.low_stock) {
            filterData.available_stock = { [Op.lt]: 10 };
        }
        console.log(filterData);
        const data = await Inventory.findAll({ where: filterData });
        if (data) {
            return { success: true, data: data };
        } else {
            return { success: false, msg: "Inventory not found!" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const updatePersonalDetails = async (req) => {
    try {
        console.log("JWT Data:", req.user);
        
        // For all users
        const { supplierId, role } = req.user;
        const { phoneNumber, storeName, storeEmail } = req.body;

        console.log("Supplier ID:", supplierId);
        console.log("Role:", role);
        console.log("Phone Number:", phoneNumber);
        console.log("Store Name:", storeName);
        console.log("Store Email:", storeEmail);
        
        // For suppliers only
        // const { phoneNumber, storeName, storeEmail } = req.user;
        
        if (role === "SUPPLIER" && supplierId) {
            // const [updatedRows] = await Supplier.update(req.body, { 
            //     where: { supplier_id: supplierId } 
            // });

            const supplier = await Supplier.findOne({ where: { supplier_id: supplierId } });

            if (!supplier) {
                return { success: false, msg: "Supplier not found!" };
            }
            
            supplier.number = phoneNumber;
            supplier.name = storeName;
            supplier.email = storeEmail;

            const updatedSupplier = await supplier.save();
            
            return { success: true, data: updatedSupplier };
        }
        
        return { success: false, error: "Not a supplier" };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

//bank details
export const get_bank_account_details = async (req) => {
    try {
        const { supplierId, role } = req.user;
        if (role !== "SUPPLIER") {
            return { success: false, error: "Not a supplier" };
        }

        if (!supplierId) {
            return { success: false, error: "Supplier ID is required" };
        }
        const bankDetails = await supplier_bank_details.findOne({ where: { supplier_id: supplierId } });
        if (!bankDetails) {
            return { success: false, msg: "Bank details not found!" };
        }
        return { success: true, data: bankDetails };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const update_bank_details = async (req) => {
    try {
        const { supplierId, role } = req.user;

        // for supplier only
        if (role !== "SUPPLIER") {
            return { success: false, error: "Not a supplier" };
        }

        const {accountNumber, ifsc, holderName } = req.body;
        console.log("hello")

        if (!supplierId) {
            return { success: false, error: "Supplier ID is required" };
        }
        const bankDetails = await supplier_bank_details.findOne({ where: { supplier_id: supplierId } });
        if (!bankDetails) {
            return { success: false, msg: "Bank details not found!" };
        }
        bankDetails.account_number = accountNumber;
        bankDetails.ifsc_code = ifsc;
        bankDetails.account_holder_name = holderName;
        await bankDetails.save();

        return { success: true, data: bankDetails };    
    } catch (error) {
        return { success: false, error: error.message };
    }
}


        // const payload = {
        //     account_number : accountNumber,
        //     ifsc_code : ifsc,
        //     account_holder_name : holderName,
        //     bank_name : "",
        //     supplier_id : supplierId,
        //     branch_name : ""
        // }





