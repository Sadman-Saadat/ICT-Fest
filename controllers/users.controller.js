const getLogin = ()=>{
    res.render("../views/users/login.ejs");
};

const postLogin = (req, res)=>{
    const {email, password} = req.body;
    console.log(email);
    console.log(password);
};

const getRegister = ()=>{
    res.render("../views/users/register.ejs");
};

const postRegister = ()=>{
    const {name, email, password, confirm_password} = req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirm_password);
};

module.exports = {
    getLogin, getRegister, postLogin, postRegister
};