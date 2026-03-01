import { Router } from 'express';
import { sendProviderMail , sendColapsMail  , sendColapsContactMail} from '../service/emailService.js';
import { emailLimiter } from '../middleware/limiter.js';

const emailRouter = Router();

// submission mails -> to provider and colaps
emailRouter.post('/submission' ,  async (req , res) => {
    const {email , toolTitle} = req.body;

    await sendProviderMail(email);
    await sendColapsMail(toolTitle , email);

    res.json({message: 'Submission Mail sent!'});
});

// contact mails -> colaps
emailRouter.post('/contact' , emailLimiter , async (req , res) => {
    const {message , email} = req.body;

    await sendColapsContactMail(message , email);

    res.json({message: 'Contact Mail sent!'})
});

export default emailRouter;