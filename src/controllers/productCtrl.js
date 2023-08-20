const Products = require('../models/productModels')

const productCtrl = {
    getProducts: async (req,res)=>{
        try {
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createProducts: async (req,res)=>{
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg:'No image upload'})

            const product = await Products.findOne({product_id})

            if(product) return res.status(400).json({msg:'This product already exist'})
            const newProduct = new Products({
        product_id, title:title.toLowCase(), price, description, content, images, category})
        
        await newProduct.save()
        return res.json({msg:'Created the Product'})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteProducts: async (req,res)=>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg:'Deleted the Product'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateProducts: async (req,res)=>{
        try {
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
}

module.exports = ProductsCtrl