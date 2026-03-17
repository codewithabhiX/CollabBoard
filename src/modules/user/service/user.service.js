import UserModel from '../models/user.model.js';
import verifyHashData from '../../../utils/verifyHashData.js';
import { hash } from 'bcrypt';


export default class UserService {
    static async registerUser(userData) {
        try {
            const user = new UserModel(userData);
            await user.save();
        } catch (error) {
            throw new Error("Error registering user: " + error.message);
        }
    }

    static async isUserExists(email) {
        try {
            const user = await UserModel.findOne({ email });
            return !!user;
        } catch (error) {
            throw new Error("Error checking user existence: " + error.message);
        }
    }

    static async getUser(email){
        try{
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            throw new Error("Error fetching userData: " + error.message);
        }
    }

    static async verifyUserCredentials(email, password) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return false;
            }
            const pass = await verifyHashData(password, user.password);
            console.log("Password Match Result:", pass); // Debugging log
            return pass;
        } catch (error) {
            throw new Error("Error verifying user credentials: " + error.message);
        }
    }
}