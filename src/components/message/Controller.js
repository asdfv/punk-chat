import mongoose from 'mongoose';

import Message from './Model';
import loggerFunc from '../../helpers/Logger';
import GeneralChatController from '../generalChat/Controller';

const log = loggerFunc(module);
const generalChatController = new GeneralChatController();

export default class MessageController {

    /**
     * Create message and add it to general chat
     */
    async create(ctx) {
        const message = new Message(ctx.request.body);
        message.owner = mongoose.Types.ObjectId(message.owner);
        try {
            const savedMessage = await message.save();
            await generalChatController.addMessage(savedMessage);
            ctx.body = savedMessage;
        } catch (err) {
            log.error(`Error saving message: \n${message} \n${err}`);
        }
    }
}
