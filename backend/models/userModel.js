import database from "../database/knex.js";

export const findUserByEmail = (email) => {
  if(!email) {
    throw new Error("Email must be defined!");
  }
  return database("users").where({ email } ).first();
};

export const insertUser = (email, hashedPassword) => {
  return database("users").insert({
    email,
    password: hashedPassword
  });
};

export const updatePasswort = (id , newPassword) => {
  return database("users")
    .where({id:id})
    .update({password: newPassword});
};
