import express from 'express';
import {
  createUser,
  updateUser,
  getAllUsers,
  getUser
} from '../controllers/user.controller';

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUser);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);

export default router;
