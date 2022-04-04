const product = require('./product');
const comments = require('./comment');
function router(app){
    app.use('/product',product);
    app.use('/comments',comments);
}

module.exports = router;