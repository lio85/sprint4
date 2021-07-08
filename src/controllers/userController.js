let userController = {
    register: function(req,res){
        res.render('users/register');
    },
    profile: function(req,res){
        res.render('users/profile'); 
    },

    login: function(req,res){
        res.render('users/login'); 
    }
}

module.exports = userController;