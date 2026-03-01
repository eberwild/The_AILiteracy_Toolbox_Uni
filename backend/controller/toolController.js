import { getAllTools , insertTool } from "../models/toolModel.js";
import { testRepoRenderMulti } from "../utils/renderRepoTest.js";

// get all tools for render
export const fetchallTools = async( _ , res) => {
    try {
        const tools = await getAllTools();

        return res.status(200).json(tools);

    } catch(err){
        console.log("Error in ToolsController/ fetchAllTools" , err.message);
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

// add a new tool 
export const provideNewTool = async(req , res) => {
    try {
        const {
            name,
            title,
            email,
            type,
            gitURL,
            imgURL,
            ageRecom,
            description
        } = req.body;

        // backend validation
        if (!name || name.trim() === "") {
            return res.status(400).json({ 
                message: "Name is required with at least 3 characters." 
            });
        }

        if (!title || title.trim() === "") {
            return res.status(400).json({ 
                message: "Title is required with at least 6 characters." 
            });
        }

        if (!email || !email.includes("@")) {
            return res.status(400).json({
                message: "Valid email is required." 
            });
        }

        if (!description || description.length < 15) {
            return res.status(400).json({
                message: "Description must be at least 15 characters."
            });
        }

        if(!type){
            return res.status(400).json({
                message: "Please select one type for your tool."
            })
        }

        // test if the submitted repoURL is able to load -> via external render
        const validGitRepoRender = await testRepoRenderMulti(gitURL);
        if (!validGitRepoRender.status) {
            return res.status(400).json({ 
                message: validGitRepoRender.text 
            });
        }
    
        // insert tool into table
        const [id] = await insertTool(req.body);

        // success feedback
        return res.status(201).json({
            message: "Tool passed all tests.",
            id
        });

    }catch(err){
        console.log("Error in provideNewTool" , err.message);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}