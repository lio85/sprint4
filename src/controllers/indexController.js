let indexController = {
    index: function(req,res){
        res.render('index');
    },
    cart: function(req,res){
        res.render('cart');
    },
}

module.exports = indexController;