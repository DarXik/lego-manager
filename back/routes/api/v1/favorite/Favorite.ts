import express from 'express';
import controller from '../../../../controllers/Set/SetsFavoriteController'

const router = express.Router();

router.patch('/', controller.patch)

export default router;