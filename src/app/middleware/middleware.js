const jwt = require('jsonwebtoken');

const middleware = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            console.log(token);
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is invalid");
                }
                req.user = user;
                console.log("user " + req.user.id);
                next();
            });
        } else {
            res.status(401).json("You're not authenticated");
        }
    },

    verifyUser: (req, res, next) => {
        middleware.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                next();
            } else {
                res.status(403).json("You do not have access");
            }
        });
    },

    verifyAdmin: (req, res, next) => {
        middleware.verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                res.status(403).json("You do not have access");
            }
        });
    },
};

module.exports = middleware;