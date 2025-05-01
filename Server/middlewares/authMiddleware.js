const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach entire decoded object to req.user
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            };

            return next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};

module.exports = authMiddleware;
