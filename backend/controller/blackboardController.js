import { getAllEntries , createEntry , deleteEntry , getEntryById } from "../models/blackboardModel.js";

export const fetchAllEntries = async( _ , res) => {
    try {
        const blackboardEntries = await getAllEntries();

        return res.status(200).json(blackboardEntries);
    }catch(err){
        console.log("Error in BlackboardController / fetchAllEntries:" , err.message);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const postEntry = async( req , res) => {
    try{
        const message = req.body.message;
        const email = req.user.email;
        const userID = req.user.id;

        // check if the user already has an active entry on the blackboard
        const existingEntry = await getEntryById(userID);
        if(existingEntry){
            return res.status(409).json({
                message: "Only one Entry per user."
            })
        }

        // no empty messages!
        if (!message || message.trim() === "") {
            return res.status(400).json({message: "Message is required"});
        }

        // insert new entry into db
        const [id] = await createEntry(email , message , userID);

        // success feedback
        return res.status(201).json({
            message: "Entry created successfully.",
            id
        });

    }catch(err){
        console.log("Error in BlackboardController/postEntry:" , err.message);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const removeEntry = async (req, res) => {
    try {
        const entryId = req.params.id;
        const userId = req.user.id;

        const deletedRows = await deleteEntry(entryId, userId);

        if (deletedRows === 0) {
            return res.status(403).json({
                message: "Not allowed to delete this entry."
            });
        }

        return res.status(200).json({
            message: "Entry deleted successfully."
        });

    } catch (err) {
        console.log("Error in BlackboardController/removeEntry:", err.message);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};