import jwt from 'jsonwebtoken'

const authMe = (req) => {
    try {
        const authHeader = req.header("Authorization");
        
        if (!authHeader) {
            return false;
        }

        const token = authHeader.replace("Bearer ", "").trim();

        if (!token) {
            return false;
        }

        const user = jwt.decode(token); 

        if (user && user.role === 'user') {
            return user._id;  
        }

        return false;  
    } catch (err) {
        throw err;  
    }
}


export default authMe