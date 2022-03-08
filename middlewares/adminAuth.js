var adminAuth = (req, res, next) => {
    if (req.session.admins != undefined) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = adminAuth;