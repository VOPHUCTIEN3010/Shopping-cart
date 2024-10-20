import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shopping-cart.tkbmp.mongodb.net/?retryWrites=true&w=majority&appName=shopping-cart`;

class DatabaseService {
    constructor() {
        this.client = new MongoClient(uri);        
    }

    async connectDb() {
        try {           
            await this.client.connect();
            this.db = this.client.db("Shopping-cart");
            await this.db.command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }

    get users() {    
        return this.db.collection(process.env.DB_COLLECTION_USERS);
    }
    get products() { 
        return this.db.collection(process.env.DB_COLLECTION_PRODUCTS);
    }
}

export const databaseService = new DatabaseService();

