"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function unpackYearMonthDate(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate()
    };
}
exports.default = unpackYearMonthDate;
