import database from "./knex.js";

// create user table
export const createTables = async () => {

  // create tools table
  const toolsExists = await database.schema.hasTable("tools");
  if (!toolsExists) {
    
    await database.schema.createTable("tools", (table) => {
      table.increments("id").primary(); 
      table.boolean("reviewed").defaultTo("false");
      table.string("name").notNullable(); 
      table.string("title").notNullable().unique();
      table.string("provider_email").notNullable();
      table.string("type").notNullable();
      table.string("git_URL").notNullable().unique();
      table.string("renderURL").defaultTo("").unique();
      table.string("img_URL").notNullable();
      table.string("age_recom").notNullable();
      table.string("description").notNullable();
      table.timestamps(true, true);      
    });
    console.log("Table tools created.");
  }

  // create ratings table
  const ratingsExists = await database.schema.hasTable("ratings");
  if(!ratingsExists){

    await database.schema.createTable("ratings" , (table) => {
      table.increments("id").primary();
      table.integer("tool_id")
        // unsigned -> no negative values are allowed
        .unsigned()
        .references("id")
        .inTable("tools")
        .onDelete("CASCADE");
      // 2 numbers -> 1 after the ","
      table.decimal("stars" , 2 , 1).notNullable();
    })
  }
};

