import { Router } from 'express';
import  { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/userController.js';

const router = Router();

//  users Routes
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//  userId routes
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//  friendId routes
// router.route('/:userId/friends/:friendId')
//     .post()
//     .delete();

export default router;
