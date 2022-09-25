exports.getIndexPage = (req, res) => {
    console.log(req.session.userID);
    res.status(200).render('index',{
        page_name : "index"
    });
}

exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name : "login"
    })
}

exports.getSignupPage = (req, res) => {
    res.status(200).render('signup', {
        page_name:"signup"
    })
}
