var router = require("express").Router();
var authConfig = require("./auth-config");

router.get("/", function (req, res) {
    res.render("index.ejs");
});

router.get("/login", function (req, res) {
    res.render("login.ejs");
});

router.post("/login", authConfig.local.login);

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/register", function (req, res) {
    res.render("register.ejs");
});

router.post("/register", authConfig.local.register);

router.get("/facebook", authConfig.facebook.login);
router.get("/facebook/callback", authConfig.facebook.callback);

router.get("/demo", authConfig.demo.login);
router.get("/demo/callback", authConfig.demo.callback);




router.get("/connect/local", function (req, res) {
    res.render("connect-local.ejs");
});

router.post("/connect/local", authConfig.local.connect);

router.get("/connect/facebook", authConfig.facebook.connect);
router.get("/connect/facebook/callback", authConfig.facebook.connectCallback);

router.get("/disconnect/local", authConfig.local.disconnect, function(req, res) {
    res.redirect("/profile");
});

router.get("/disconnect/facebook", authConfig.facebook.disconnect, function(req, res) {
    res.redirect("/profile");
});
 

router.get("/profile", ensureAuthenticated, function(req, res) {
    res.render("profile.ejs", { user: req.user });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    
    res.redirect("/login");
}

module.exports = router;