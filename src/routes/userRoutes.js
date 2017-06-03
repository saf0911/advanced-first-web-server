import express from 'express';
import userController from '../controllers/userController';


const router = express.Router();

router.get('/users', userController.list);


router.get('/users/:id', userController.show);


router.delete('/users/:id', userController.remove);


router.post('/users', userController.create);


export default router;
