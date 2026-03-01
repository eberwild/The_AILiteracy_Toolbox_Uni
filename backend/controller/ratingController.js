import { insertRating  , getRatings } from "../models/ratingModel.js";

export const submitRating = async (req , res) => {
    try {
        const { rating , toolID } = req.body;

        if(!rating || !toolID){
            return res.status(400).json({message: 'Missing credentials.'});
        }
        const [id] = await insertRating(rating , toolID);

        return res.status(201).json({message: 'Rating submitted successfully.'});
    } catch(error) {    
        console.error('Error in submitRating controller: ' , error.message);
        res.status(500).json({message: 'Internal Server Error.'});
    }
}

export const fetchRatings = async ( _ , res) => {
    try{
        const ratings = await getRatings();
        // group all ratings by their ToolID
        const groupedRatings = {};
        ratings.forEach((rating) => {
            if(!groupedRatings[rating.tool_id]){
                groupedRatings[rating.tool_id] = [];
            }
            groupedRatings[rating.tool_id].push(rating.stars);
        })

        const averages = {};

        Object.keys(groupedRatings).forEach((toolId) => {
            const values = groupedRatings[toolId];
            const avg = values.reduce((sum, val) => sum + val, 0) / values.length;

            const rounded = Math.round(avg * 2) / 2;

            averages[toolId] = rounded;
        });
        res.status(200).json(averages);
    } catch(error) {
        console.error('Error in fetchRatings: ' , error.message);
        res.status(500).json({message: 'Internal Server Error.'});
    }
}