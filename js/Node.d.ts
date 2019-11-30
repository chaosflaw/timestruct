export default class Node {
    value: any;
    time: Date;
    next: Node | null;
    prev: Node | null;
    constructor(value: any, time: Date, prev?: Node | null, next?: Node | null);
}
