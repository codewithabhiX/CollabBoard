import mongoose from "mongoose";

const taskCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taskAssignedTo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done"],
        default: "To Do"
    },
    userId:{
        type: String,
        required: true
    }

});

export default mongoose.model("TaskCard", taskCardSchema);