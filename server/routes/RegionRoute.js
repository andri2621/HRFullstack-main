// 1. import module Router
import { Router } from 'express';
import indexCtrl from '../controllers/IndexController'


const router = Router();



router.get('/', indexCtrl.regions.findAll);
router.get('/:id', indexCtrl.regions.findRegionById);
router.post('/', indexCtrl.regions.create);
router.put('/:id', indexCtrl.regions.update);
router.delete('/:id', indexCtrl.regions.remove);

export default router;
