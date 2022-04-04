const Comment = require('../models/commentModel');

class apiFeature{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }

    sorting(){
        this.query = this.query.sort('-createdAt'); 
        return this;
    }
    paginating(){
        const page = this.queryString.page*1|| 1;
        const limit = this.queryString.limit * 1|| 3;
        const skip = limit * (page -1);
        this.query = this.query.limit(limit).skip(skip);
        return this;
    }
}

class commentController{
    async getComments(req,res){
        try{
            const feature = new apiFeature(Comment.find({product_id:req.params.id}),req.query).sorting().paginating();
            const comments = await feature.query;

            res.status(200).json({comments,
            result:comments.length
            });
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }
}

module.exports = new commentController;