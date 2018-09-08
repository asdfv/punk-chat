import uniqid from 'uniqid';

import ChatRoom from './ChatRoom';

/**
 * Manager for work with @ChatRoom
 */
export default class ChatRoomManager {

    constructor() {
        this.chatRooms = {};
    }

    createRoom(name) {
        let room = new ChatRoom(uniqid(), name);
        this.chatRooms[room.id] = room;
        return room;
    }

    findByName(searchSubstring) {
        let lowerSearchSubstring = searchSubstring.toLowerCase();
        let rooms = Object.values(this.chatRooms);
        return rooms.filter(room => room.name
            .toLowerCase()
            .indexOf(lowerSearchSubstring) !== -1,
        );
    }

    getById(id) {
        return this.chatRooms[id];
    }
}
