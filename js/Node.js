"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(value, time, prev = null, next = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
        this.time = time;
    }
}
exports.default = Node;
