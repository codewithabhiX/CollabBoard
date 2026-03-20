import UserService from '../service/user.service.js';
import generateToken from '../../../utils/generateTokens.js';
import hashData from "../../../utils/hashData.js";

export default class UserController {

  static async registerUser(req, res) {
    console.log("Register User Request Body:", req.body); // Debugging log
    try {
      const { name, email, password ,userName} = req.body;
      const userData = { name, email, password,userName };

      const userEmail = await UserService.isUserExists(email);
      if (userEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      const isUserName = await UserService.isUserNameExists(userName);
      if (isUserName) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      }

      const hashedPassword = await hashData(password);

      console.log("Hashed Password:", hashedPassword); // Debugging log

      await UserService.registerUser({ ...userData, password: hashedPassword });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message, // Include error message for debugging
      });
    }
  }

  static async loginUser(req, res) {
    console.log("Login User Request Body:", req.body); // Debugging log
    try {
      const { email, password } = req.body;

      const userExists = await UserService.isUserExists(email);

      console.log("User Exists:", userExists); // Debugging log

      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const isValidCredentials = await UserService.verifyUserCredentials(email, password);
        console.log("Valid Credentials:", isValidCredentials); // Debugging log
      if (!isValidCredentials) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const user = await UserService.getUser(email);

      console.log("User Data:", user); // Debugging log

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        userName:user.userName
      };

      const { accessToken } =  generateToken(payload);
      console.log("Generated Access Token:", accessToken); // Debugging log

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: {
          accessToken,
        },
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}