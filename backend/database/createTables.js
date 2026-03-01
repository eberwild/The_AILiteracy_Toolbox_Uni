import database from "./knex.js";

// create user table
export const createTables = async () => {
  // check if the table already exists
  const userExists = await database.schema.hasTable("users");
  if (!userExists) {
    // if not -> create the table
    await database.schema.createTable("users", (table) => {
      table.increments("id").primary(); 
      table.string("email").notNullable().unique(); 
      table.string("password").notNullable(); 
      table.string("role").notNullable().defaultTo("user");
      table.boolean("verified").notNullable().defaultTo(false);
      table.timestamps(true, true);      // created_at & updated_at
    });
    console.log("Table users created.");

    // explanation in SQL what knex is doing :
    /*
      CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,     -- table.increments("id").primary()
      email VARCHAR(255) NOT NULL UNIQUE,       -- table.string("email").notNullable().unique()
      password VARCHAR(255) NOT NULL,           -- table.string("password").notNullable()
      role VARCHAR(255) NOT NULL DEFAULT 'user',-- table.string("role").notNullable().defaultTo("user")
      verified BOOLEAN NOT NULL DEFAULT 0,      -- table.boolean("verified").notNullable().defaultTo(false)
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- table.timestamps(true, true)
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP   -- table.timestamps(true, true)
      );
    */
  }

  // create blackboard table
  const blackboardExists = await database.schema.hasTable("blackboard");
  if (!blackboardExists) {
    
    await database.schema.createTable("blackboard", (table) => {
      table.increments("id").primary().unique();
      table.integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.boolean("reviewed").defaultTo("false");
      table.string("email").notNullable().unique(); 
      table.string("message").notNullable();
      table.timestamps(true, true);      
    });
    console.log("Table blackboard created.");
  }

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

