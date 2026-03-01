import rateLimit from "express-rate-limit";

// rate limit -> 100 request / 15 min
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000 ,
  max: 100 ,
  message: {
    message: 'Too many request, little break for you!'
  }
});

export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000 ,
    max: 10 ,
    message: {
        message: 'Too many login attempts!'
    }
});

export const registerLimiter = rateLimit({
    windowMs: 30 * 60 * 1000 ,
    max: 3 ,
    message: {
        message: 'Too many registrations.'
    }
});

export const resetLimiter = rateLimit({
    windowMs: 10 * 60 * 1000 ,
    max: 2 ,
    message: {
        message: 'Too many password changes!'
    }
});

export const passwordChangeLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 2,
    message: { message: 'Too many password changes!' }
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

export const blackBoardLimiter = rateLimit({
    windowMs: 10 * 60 * 1000 ,
    max: 3 ,
    message: {
        message: 'Too many Blackboard actions.'
    }
});

export const deleteBlackboardLimiter = rateLimit({
    windowMs: 10 * 60 * 1000 ,
    max: 3 ,
    message: {
        message: 'Too many Blackboard actions.'
    }
})