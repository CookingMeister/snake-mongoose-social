import { Router } from 'express';
import  { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/userController.js';

const router = Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// router.route('/:userId/friends/:friendId')
//     .post()
//     .delete();

export default router;
