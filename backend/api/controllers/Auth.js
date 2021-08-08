module.exports.login = (req, res) => {
    res.send('Authenticated');
}

module.exports.callback = (req, res) => {
    res.send(req.user);
}

module.exports.logout = (req, res) => {
    req.logout();
    res.send('Logged out')
}

module.exports.getUser = (req, res) => {
    res.send(req.user)
}