import { findUserByEmail , insertUser , updatePasswort} from "../models/userModel.js";
import { sendResetLink } from "../service/emailService.js";
import bcrypt from "bcryptjs";
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('../.env.local') });

// register a new user
export const createUser = async (req , res) => {

  try{

    const {email ,  password} = req.body;

    // empty email or password -> feedback to user
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter an email AND a password." });
    }   
      
    const stringEmail = email ? String(email).trim() : null;

    // check if Email is already in use
    const existingUser = await findUserByEmail(stringEmail);
    if(existingUser) {
      return res.status(400).json({message: 'Email is already in use.'});
    }

    // hash the User-password
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if(!hashedPassword){
      return res.status(400).json({message: "undefined hashedpassword"});
    }

    // create new user 
    const [id] = await insertUser( email, hashedPassword );

    // create payload and get secret to create a jwt
    const payload = {
      email,
      id
    };

    // get the secretKey out of the .env file -> no secret = error
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    // create token -> expires in 1 hour -> after that new login for protected api-routes
    const token = jwt.sign(payload , secret , { expiresIn: "1h"});

    // succesfull registration with token in return
    return res.status(201).json(
      {
        message: 'Registered succesfully.' ,
        token
      }
    )

  } catch (error) {
      console.error('Error in registerUser controller' , error.stack);
      return res.status(500).json({ message: 'Internal server error' });
    } 
};

// login user
export const loginUser = async (req , res) => {
  
  try {
    const {email , password} = req.body;

    // if user/email exists -> get user as an object
    const user = await findUserByEmail(email);

    // if user does not exists -> feedback to user
    if(!user){
      return res.status(401).json({message: 'Wrong credentials.'});
    }

    // check if user has entered the correct password to login
    const passwordMatch = await bcrypt.compare(password , user.password);
    if(!passwordMatch){
      return res.status(401).json({message:'Wrong credentials.'});
    }

    // Payload to generate a token after succesfull login
    const payload = {
      email: user.email,
      role: user.role,
      id: user.id
    };
    const secret = process.env.JWT_SECRET;

    // after login data is checked -> return a jwt 
    const token = jwt.sign(payload , secret , { expiresIn: "1h"});

    // after succesfull login -> user gets the signed token from the server
    res.status(200).json(
      {
        message:'Login succesfull.',
        token
      }
    );

  } catch(error){
      console.error('Error im loginUser controller' , error.stack);
      return res.status(500).json({ message: 'Internal server error' });
  }

};

// sends an email and guides to the passwort change page
export const requestResetEmail = async (req , res) => {
  try {
    const email = req.body.email;

    const user = await findUserByEmail(email);

    if(!user){
      return res.status(200).json({message: 'User not found.'});
    }

    const payload = {
      email,
      role: user.role,
      id: user.id
    };
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(payload , secret , { expiresIn: "1h"});

    // redirect to password-change page with token in searchParams
    const port = process.env.FRONTEND_PORT;
    const resetLink = `http://localhost:${port}/reset?token=${token}`;

    await sendResetLink(email , resetLink);

    res.status(200).json({message: 'If this email does exists , password reset link was sent.'});
  } catch(error) {
    console.log('Error in requestResetEmail: ' , error.message);
    res.status(500).json({message: 'Error: Not able to send the reset Link.'});
  }
  
}

export const changePassword = async (req , res) => {
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json({message: 'No token found.'})
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    const userID = decoded.id;
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password , Number(process.env.SALT_ROUNDS));

    await updatePasswort(userID , hashedPassword);

    return res.status(200).json({message: 'Password changed!'});

  } catch (error) {
    return res.status(400).json({message: 'Error in changePasswort.'});
  }

}

