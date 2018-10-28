import Message from './Model';
import loggerFunc from '../../helpers/Logger';
import GeneralChatController from '../generalChat/Controller';

const log = loggerFunc(module);

export default class MessageController {
    constructor() {
        this.generalChatController = new GeneralChatController();
    }

    /**
     * Create message and add it to general chat
     */
    async create(ctx) {
        const message = new Message(ctx.request.body);
        try {
            const savedMessage = await message.save();
            await this.generalChatController.addMessage(savedMessage);
            ctx.body = savedMessage;
        } catch (err) {
            log.error(`Error saving message: ${message}: ${err}`);
        }
    }
}
