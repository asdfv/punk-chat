import Controller from './Controller';
import router from '../../koa/BaseRouter';

const chatController = new Controller();

router.get('/chats', chatController.findAll);
router.post('/chats', chatController.create);
router.get('/chats/chat/:id', chatController.findOne);

export default router;
