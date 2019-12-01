"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
const unpackYearMonthDate_1 = __importDefault(require("./util/unpackYearMonthDate"));
class Timeline {
    constructor() {
        this._latest = null;
        this._earliest = null;
        this._tree = {};
        this._length = 0;
    }
    get earliest() {
        return this._earliest;
    }
    get latest() {
        return this._latest;
    }
    _append(node) {
        let latest = this._latest;
        if (latest) {
            latest.next = node;
            node.prev = latest;
        }
        this._latest = node;
    }
    _prepend(node) {
        let earliest = this._earliest;
        if (earliest) {
            earliest.prev = node;
            node.next = earliest;
        }
        this._earliest = node;
    }
    _createReferenceIfDoesNotExist(year, month) {
        if (!this._tree[year])
            this._tree[year] = {};
        if (!this._tree[year][month])
            this._tree[year][month] = {};
    }
    _recordAtCorrespondingTreeNode(time, node) {
        let { year, month, date } = unpackYearMonthDate_1.default(time);
        this._createReferenceIfDoesNotExist(year, month);
        this._tree[year][month][date] = node;
    }
    set(time, value) {
        let node = new Node_1.default(value, time);
        if (!this._latest) {
            this._latest = node;
            this._earliest = node;
            this._length++;
        }
        else {
            let { year, month, date } = unpackYearMonthDate_1.default(time);
            let currentNode = this._tree[year] && this._tree[year][month] && this._tree[year][month][date];
            if (currentNode) {
                node.prev = currentNode.prev;
                node.next = currentNode.next;
                if (this._length === 1) {
                    this._latest = node;
                    this._earliest = node;
                }
            }
            else {
                if (node.time >= this._latest.time)
                    this._append(node);
                else if (this._earliest && node.time <= this._earliest.time)
                    this._prepend(node);
                else {
                    let current = this._latest;
                    while (current.prev && current.prev.time >= time)
                        current = current.prev;
                    if (current.prev) {
                        let prev = current.prev;
                        prev.next = node;
                        node.prev = prev;
                        current.prev = node;
                        node.next = current;
                    }
                    else
                        this._prepend(node);
                }
                this._length++;
            }
        }
        this._recordAtCorrespondingTreeNode(time, node);
        return node;
    }
    get(time) {
        let { year, month, date } = unpackYearMonthDate_1.default(time);
        return (this._tree[year] && this._tree[year][month] && this._tree[year][month][date]) || undefined;
    }
}
exports.default = Timeline;
