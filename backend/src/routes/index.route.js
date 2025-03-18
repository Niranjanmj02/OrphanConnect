    import express from 'express';
    import { userRouter } from './user.route.js';
    import { orphanageRouter } from './orphanage.route.js';
import { donationrouter } from './donation.route.js';
    const indexRouter = express.Router();

    indexRouter.use('/api/v1/users', userRouter);
    indexRouter.use('/api/v1/orphanage',orphanageRouter)
    indexRouter.use('/api/v1/donation',donationrouter)
    export default indexRouter;
