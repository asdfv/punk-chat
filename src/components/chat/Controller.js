import Chat from './Model';

export default class ChatController {
    async create(ctx) {
        const chat = new Chat(ctx.request.body);
        ctx.body = await chat.save()
    }

    async findAll(ctx) {
        ctx.body = await Chat.find({});
    }

    async findOne(ctx) {
        const { id } = ctx.params;
        ctx.body = await Chat.findById(id);
    }
}
