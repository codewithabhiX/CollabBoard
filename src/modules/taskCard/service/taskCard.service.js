import taskCardModel from "../models/taskCard.model.js";
export default class TaskCardService {
    static async createTaskCard(taskCardData) {
        try {
            const taskCard = new taskCardModel(taskCardData);
            await taskCard.save();
        } catch (error) {
            throw new Error("Error creating task card: " + error.message);
        }
    }

    // Implement other service methods for getting, updating, and deleting task cards as needed     
    static async getAllTaskCards() {
        try {
            return await taskCardModel.find();
        } catch (error) {
            throw new Error("Error fetching task cards: " + error.message);
        }
    }

    static async updateTaskCard(id, updateData,userId) {
        try {
             const  isUserSame = await taskCardModel.findOne({_id:id,userId:userId})
             if(isUserSame){
                await taskCardModel.findByIdAndUpdate(id, updateData);
             }
        } catch (error) {
            throw new Error("Error updating task card: " + error.message);
        }   
    }

        static async deleteTaskCard(id,userId) {   
        try {
            const  isUserSame = await taskCardModel.findOne({_id:id,userId:userId})
             if(isUserSame){
            await taskCardModel.findByIdAndDelete(id);
             }
        } catch (error) {
            throw new Error("Error deleting task card: " + error.message);
        }
    }

}

