import database from "../database/knex.js";

export const getAllTools = () => {
    return database("tools").select("*");
}

export const insertTool = (input) => {
    return database("tools").insert({
        name: input.name,
        title: input.title,
        provider_email: input.email,
        tags: input.tags,
        git_URL: input.gitURL,
        img_URL: input.imgURL,
        age_recom: input.ageRecom,
        description: input.description
    })
}