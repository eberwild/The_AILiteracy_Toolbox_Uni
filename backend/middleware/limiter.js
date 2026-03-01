import rateLimit from "express-rate-limit";

// rate limit -> 100 request / 15 min
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000 ,
  max: 100 ,
  message: {
    message: 'Too many request, little break for you!'
  }
});
export const emailLimiter = rateLimit({
    windowMs: 10 * 60 *1000 ,
    max: 3 ,
    message: 'Too many actions!'
});

export const submissionLimiter = rateLimit({
    windowMs: 10 * 60 * 1000 ,
    max: 1 ,
    message: {
        message: 'Too many Tool submissions.'
    }
});
