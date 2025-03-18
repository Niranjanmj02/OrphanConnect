import express from 'express';
import {orphanagecontroller } from '../controllers/orphanage.controller.js';

const orphanageRouter = express.Router();


orphanageRouter.route('/register').post(orphanagecontroller.createorphan)
orphanageRouter.route('/getorphan').get(orphanagecontroller.getorphan)
orphanageRouter.route('/getorphanbyid/:id').get(orphanagecontroller.getorphanbyid)
export { orphanageRouter };