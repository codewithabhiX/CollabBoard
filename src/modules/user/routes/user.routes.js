import express from 'express';
import UserController from '../controllers/user.controller.js';


const userRoutes = express.Router();

// Define user-related routes here
userRoutes.post('/user/login', UserController.loginUser);
userRoutes.post('/user/register', UserController.registerUser);


export default userRoutes;
