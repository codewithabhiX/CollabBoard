import TaskCardService from "../service/taskCard.service.js";

export default class TaskCardController {
    static async createTaskCard(req, res) {
        try {
            console.log(req.body);
            console.log(req.user.id);
            const { title, description,taskAssignedTo, status } = req.body;
            const id=req.user.id;
            const taskCardData = { title, description, taskAssignedTo , status,id};
            await TaskCardService.createTaskCard(taskCardData);
            return res.status(201).json({
                success: true,
                message: "Task card created successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false, 
                message: "Internal Server Error",
            });
        }
    }

    static async getAllTaskCards(req, res) {
        // Implementation for getting all task cards
        // This is a placeholder - you should implement the actual logic to fetch all task cards from the database
        return res.status(200).json({
            success: true,
            message: "Fetched all task cards successfully",
            data: await TaskCardService.getAllTaskCards() // Replace with actual data
        });
    }

    static async updateTaskCard(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            await TaskCardService.updateTaskCard(id, updateData);
            return res.status(200).json({
                success: true,
                message: "Task card updated successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    static async deleteTaskCard(req, res) { 
        try {
            const { id } = req.params;
            await TaskCardService.deleteTaskCard(id);
            return res.status(200).json({
                success: true,
                message: "Task card deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
        }

}
