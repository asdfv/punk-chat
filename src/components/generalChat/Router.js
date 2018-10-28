import Controller from './Controller';
import router from '../../koa/BaseRouter';

const generalChatController = new Controller();

router.get('/generalChat', generalChatController.loadChat);

export default router;
