import TaskCardController from "../controllers/taskCard.controller.js";
import express from "express";
import authMiddleware from "../../../../middlewares/authMiddleware.js";

const taskCardRoutes = express.Router();

taskCardRoutes.post('/taskcard',authMiddleware, TaskCardController.createTaskCard);
taskCardRoutes.get('/taskcard', authMiddleware, TaskCardController.getAllTaskCards);
taskCardRoutes.put('/taskcard/:id', authMiddleware, TaskCardController.updateTaskCard);
taskCardRoutes.delete('/taskcard/:id', authMiddleware, TaskCardController.deleteTaskCard);


export default taskCardRoutes;