// 1. import module Router
import { Router } from 'express';
import indexCtrl from '../controllers/IndexController'


const router = Router();



router.get('/',indexCtrl.users.requireSignin,indexCtrl.users.findAll);
router.post('/signup', indexCtrl.users.signup);
router.post('/signin/', indexCtrl.users.signin);

export default router;
