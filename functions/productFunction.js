import productModel from "../schema/productSchema.js";

/* CREATE PRODUCT */
export const productCreate = async (req, res) => {
  try {
    await productModel.create({...req.body,seller_id : req.userId });
    

  
    res.status(200).json({messge :"Product created successfully", success : true})
  } catch (error) {
    console.log(error);
    res.status(500).send("Product creation failed");
  }
};

/* GET ALL PRODUCTS */
export const productGet = async (req, res) => {
  try {
   
    const products = await productModel.find();
  
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to fetch products");
  }
};

/* GET PRODUCT BY ID */
export const productGetById = async (req, res) => {
  try {
    const id= req.params.id
    const product = await productModel.findById(id);
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Product not found");
  }
};

/* UPDATE PRODUCT */
export const productUpdate = async (req, res) => {
  try {
    await productModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("Product updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Product update failed");
  }
};

/* DELETE PRODUCT */
export const productDelete = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.send("Product deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Product delete failed");
  }
};

