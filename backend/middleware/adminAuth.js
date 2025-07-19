import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains the expected admin information
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        // If everything is fine, proceed to the next middleware
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default adminAuth;
