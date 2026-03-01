import dotenv from 'dotenv';  
dotenv.config({ path: path.resolve('./.env.local')});              // env-File laden -> before all imports that use .env

console.log("CWD:", process.cwd());
console.log("ENV DB_PATH:", process.env.DB_PATH);
import path from 'path';

// dependencies
import express from 'express';
import cors from 'cors';
// routes
import toolRouter from './routes/toolRoutes.js';
import emailRouter from './routes/emailRoutes.js';
import ratingRouter from './routes/ratingsRoutes.js';
// database
import { createTables } from './database/createTables.js';

const app = express();              // express for api routing
const port = process.env.PORT;     

// cors -> frontend and backend are listening on different ports 
app.use(cors());

// JSON parsing middleware-> to get acces to req.body as JSON
app.use(express.json());

// simple middleware logger 
app.use((req , _ , next) => {
    console.log(`Request-Method: ${req.method} , Request-URL: ${req.url} `);
    // next() -> express will continue with the next middleware or api-route
    next();
})

// api-routes -> tools
app.use('/api/tools' , toolRouter);

// api-routes -> email
app.use('/api/email' , emailRouter);

// api-routes -> rating
app.use('/api/rating', ratingRouter);

// init the db tables -> dont start server if table creation throws an error
createTables()
  .then(() => {
    app.listen(port, '0.0.0.0' , () => {
      console.log(`Server läuft auf http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Fehler beim Erstellen der Tabellen:', err);
  });