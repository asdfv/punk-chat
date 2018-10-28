import Controller from './Controller';
import router from '../../koa/BaseRouter';

const userController = new Controller();

router.post('/user/login', userController.login);

export default router;
