import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization")
        const token = authHeader.replace("Bearer ", "").trim();        

        if (!token) return res.status(401).json({ error: "Unauthorized" })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401).json({ error: "Unauthorized" })

            req.user = user            
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export default auth;
