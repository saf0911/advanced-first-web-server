import express from 'express';
import userController from '../controllers/userController';


const router = express.Router();

router.get('/users', userController.list);

router.post('/users', userController.create);

router.get('/users/:id', userController.show);

router.delete('/users/:id', userController.remove);





export default router;
