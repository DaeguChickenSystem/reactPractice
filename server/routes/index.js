import express from 'express';
import account from './account';
import memo from './memo';
import post from './post';

const router = express.Router();

router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

router.use('/account', account);
router.use('/post', post);
export default router;
