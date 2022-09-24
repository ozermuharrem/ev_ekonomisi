exports.getIndexPage = (req, res) => {
    res.status(200).render('index');
}

exports.getLoginPage = (req, res) => {
    res.status(200).render('login')
}

exports.getSignupPage = (req, res) => {
    res.status(200).render('signup')
}

exports.getEvEkoMainPage = (req, res) => {
    res.status(200).render('evEkoMain')
}

