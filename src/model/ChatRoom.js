import uniqid from 'uniqid'

import Message from './Message'

/**
 * ChatRoom entity
 */
export default class ChatRoom {

    constructor(id, name) {
        this.id = id;
        this.messages = [];
        this.name = name;
    }

    postMessage(body, username) {
        let message = new Message(uniqid(), body, username);
        this.messages.push(message);
        return message;
    }

    toJson() {
        return {
            id: this.id,
            name: this.name
        };
    }
}
