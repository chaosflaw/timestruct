"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const Timestruct_1 = __importDefault(require("./Timestruct"));
describe('Timeline', () => {
    it('should allow adding and retrieving a value to and from a specific day', () => {
        let time = new Timestruct_1.default();
        let node, date;
        date = new Date();
        time.set(date, 'test');
        node = time.get(date);
        chai_1.expect(node && node.value).to.equal('test');
        date = new Date(1998, 11, 25);
        time.set(date, 'test');
        node = time.get(date);
        chai_1.expect(node && node.value).to.equal('test');
    });
    describe('set should order days correctly', () => {
        let time = new Timestruct_1.default();
        let day1 = time.set(new Date(2019, 5, 23, 12, 56, 43), 'day1');
        let day3 = time.set(new Date(2019, 6, 13), 'day3');
        let day2 = time.set(new Date(2019, 5, 26, 12), 'day2');
        let day4 = time.set(new Date(2019, 7, 20, 13, 56), 'day4');
        it('previous', () => {
            chai_1.expect(day1 && day1.prev).to.not.exist;
            chai_1.expect(day2 && day2.prev && day2.prev.value).to.equal('day1');
            chai_1.expect(day3 && day3.prev && day3.prev.value).to.equal('day2');
            chai_1.expect(day4 && day4.prev && day4.prev.value).to.equal('day3');
        });
        it('next', () => {
            chai_1.expect(day1 && day1.next && day1.next.value).to.equal('day2');
            chai_1.expect(day2 && day2.next && day2.next.value).to.equal('day3');
            chai_1.expect(day3 && day3.next && day3.next.value).to.equal('day4');
            chai_1.expect(day4 && day4.next).to.not.exist;
        });
    });
});
