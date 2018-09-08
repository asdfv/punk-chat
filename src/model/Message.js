/**
 * Message entity
 */
export default class Message {
    constructor(id, body, username, datetime) {
        this.id = id;
        this.body = body;
        this.username = username;
        this.datetime = datetime || new Date();
    }

    toJson() {
        return {
            id: this.id,
            body: this.body,
            username: this.username,
            datetime: this.datetime.toUTCString(),
        };
    }
}
