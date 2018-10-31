import mongoose from 'mongoose';

import GeneralChat from './Model';
import config from '../../config';
import loggerFunc from '../../helpers/Logger';

const log = loggerFunc(module);
const _id = mongoose.Types.ObjectId(config.generalChatId);

export default class GeneralChatController {

    /**
     * Load general chat and populate it with messages and participants
     */
    async loadChat(ctx) {
        const chat = await GeneralChat.findById(config.generalChatId);
        await chat.populate('messages').execPopulate();
        await chat.populate('participants').execPopulate();
        ctx.body = chat;
    }

    /**
     * Create general chat with configured _id if it does`t exists
     */
    async createIfNotExists() {
        if (await this.getGeneralChat()) {
            return;
        }
        const chat = new GeneralChat({ _id });
        try {
            await chat.save();
        } catch (err) {
            log.error('Error creating general chat');
            throw err;
        }
    }

    /**
     * Add message to general chat
     */
    async addMessage(message) {
        try {
            await GeneralChat.findOneAndUpdate({ _id }, { $push: { messages: message._id } });
        } catch (err) {
            log.error(`Error while add message to general chat, ${message}, ${err}`);
            throw err;
        }
    }

    /**
     * Add participant to general chat
     */
    async addParticipant(participant) {
        try {
            await GeneralChat.findOneAndUpdate({ _id }, { $addToSet: { participants: participant._id } });
        } catch (err) {
            log.error(`Error adding participant to chat: ${participant}. Error: ${err.stack}`);
            throw err;
        }
    }

    async getGeneralChat() {
        return await GeneralChat.findById(config.generalChatId);
    }
}
