import { Router } from 'express';

const router = Router();

router.route('/')
    .get()
    .post();

router.route('/:userId')
    .get()
    .put()
    .delete();

router.route('/:userId/friends/:friendId')
    .post()
    .delete();
