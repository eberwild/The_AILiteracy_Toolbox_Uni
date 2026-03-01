import database from "../database/knex.js";

export const getAllEntries = () => {
    return database("blackboard").select("*").where({ reviewed: false});
}

export const getEntryById = (userID) => {
    return database("blackboard")
        .select("*")
        .where({ user_id: userID})
        .first();
}

export const createEntry = (email , message , userID) => {
    return database("blackboard").insert({
        email,
        message,
        user_id: userID
    });
}

export const deleteEntry = (id , userID) => {
    return database("blackboard")
        .where({ id , user_id: userID})
        .del();
}