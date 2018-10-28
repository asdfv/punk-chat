import Controller from './Controller';
import router from '../../koa/BaseRouter';

const messageController = new Controller();

router.post('/message', messageController.create);

export default router;
