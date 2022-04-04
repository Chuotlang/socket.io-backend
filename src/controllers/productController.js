const Product = require('../models/productModel');
class productController{
    async getAll(req,res){
        try{
            const product = await Product.find();
            res.status(200).json({products:product});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }
    async createOne(req,res){
        try{
            const {title,image,price,reviewer,rating}  = req.body;
            const product = new Product({
                title,image,price,reviewer,rating
            });
            await product.save();
            res.status(200).json({msg:"Create SuccecssFully."});

        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async review(req,res){
        try{
            const {rating} = req.body;
            const product = await Product.findById(req.params.id);
            if(!product){
                return res.status(400).json({msg:"Product is not exist."});
            }
            
            const rate = product.rating + rating;
            const reviewer = product.reviewer + 1;
            await Product.findByIdAndUpdate(product._id,{
                rating:rate,
                reviewer
            });
            res.status(200).json({msg:"Rating success."});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }
}

module.exports = new productController;