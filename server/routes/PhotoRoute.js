import { Router } from 'express';
import indexCtrl from '../controllers/IndexController'


const router = Router();

router.get('/',indexCtrl.photos.findAll)

export default router;