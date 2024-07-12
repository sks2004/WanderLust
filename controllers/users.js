const User = require("../models/user");

module.exports.renderSignupForm = (req,resp)=>{
    resp.render("users/signup.ejs");
};

module.exports.signup = async (req,resp)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        let registeredUSer = await User.register(newUser,password);
        req.login(registeredUSer,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust!");
            resp.redirect("/listings");
        });
    }
    catch(err){
        req.flash("error",err.message);
        resp.redirect("/signup");
    }
};

module.exports.renderLoginForm = async(req,resp) => {
    resp.render("users/login.ejs");
}

module.exports.login = async (req,resp)=>{
    req.flash("success","Welcome back to WanderLust!");
    let redirectUrl = resp.locals.redirectUrl || "/listings";
    resp.redirect(redirectUrl);
}

module.exports.logout = (req,resp,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    req.flash("success","you are logged out now!");
    resp.redirect("/listings");
    })
}