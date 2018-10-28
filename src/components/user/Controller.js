import User from './Model';
import GeneralChatController from '../generalChat/Controller';
import loggerFunc from '../../helpers/Logger';

const log = loggerFunc(module);

export default class UserController {
    constructor() {
        this.generalChatController = new GeneralChatController();
        this.login = this.login.bind(this);
    }

    /**
     * Create user if it does`t exists end add it to general chat participants
     */
    async login(ctx) {
        const { name } = ctx.request.body;
        const { generalChatController } = this;
        const user = await this.findOrCreate(name);
        await generalChatController.addParticipant(user);
        ctx.status = 200
    }

    async findOrCreate(name) {
        try {
            return await User.findOne({ name }) || await new User({ name }).save();
        } catch (err) {
            log.error(`Error while find or create user '${name}'. ${err.stack}`);
            throw err;
        }
    }
}
