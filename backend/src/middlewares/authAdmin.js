import User from '../models/userModel.js';
import { databaseService } from '../services/databaseServices.js';
import { ObjectId } from "mongodb";

const authAdmin = async (req, res, next) => {
    try {

        const user = await databaseService.products.findOne({ _id: new ObjectId(req.user._id) });
        
        if (user && user.role === 'admin') {
            return res.status(403).json({ error: "Admin resources access denied" });
        }

        next();

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export default authAdmin;
