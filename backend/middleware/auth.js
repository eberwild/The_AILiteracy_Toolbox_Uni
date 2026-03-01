import jwt from 'jsonwebtoken';

export const verifyToken = (req , res , next) => {

    // get the HTTP-Header with the token inside
    // example header -> GET /api/trips HTTP/1.1
    //                   Host: localhost:3000
    //                   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    //                   Content-Type: application/json
    
    const authHeader = req.headers.authorization;

    // no header = no token -> acces denied cause user is not logged in
    // 401 -> Unauthorized , no valid token to use the api route
    if(!authHeader){
        return res.status(401).json({message: 'You are not logged in, access denied.'});
    }

    // get the token out of the header
    // Bearer <Token> -> we only need to extract the token
    // Bearer -> prefix to define that the following is an access token
    // split('') -> ['Bearer' , '<Token>']
    // [1] -> only exntracts the token out of the array
    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'You are not logged in, access denied.'});
    }

    // verify the token
    jwt.verify(token , process.env.JWT_SECRET , (error , decoded) => {

        // check if the token is valid and can still be used
        // 403 -> Forbidden , token found but not valid
        // better 401 for both to have a better reaction in the frontend
        if(error){
            return res.status(401).json({message: 'You need to be logged in '})
        }

        // if no error accures by checking the token -> decoded will be the users payload + the timestamps
        // user infos will be added to the HTTP-Header
        // middleware or api-routes after the verification have access to the user data
        req.user = decoded;
        console.log(decoded)

        // token check is valid -> tell express to continue with next middleware or api-route
        next();
    })
}