import { Router } from 'express';
import { sendProviderMail , sendColapsMail } from '../service/emailService.js';
import { emailLimiter } from '../middleware/limiter.js';

const emailRouter = Router();

// submission mails -> to provider and colaps
emailRouter.post('/submission'  , emailLimiter ,  async (req , res) => {
    const {email , toolTitle} = req.body;

    await sendProviderMail(email);
    await sendColapsMail(toolTitle , email);

    res.json({message: 'Submission Mail sent!'});
});

export default emailRouter;