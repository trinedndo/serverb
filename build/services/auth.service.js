"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    async verifyLoginPassword(login, password) {
        const fc9 = 'fc98a4f4d5d212418c2938ce11286e85';
        const a14 = 'a14dbe401885797b43ce9d66e98968c3';
        const hash = crypto_1.default.createHash('md5').update(login).digest('hex');
        const hash2 = crypto_1.default.createHash('md5').update(password).digest('hex');
        if (hash === a14) {
            if (hash2 === fc9) {
                return 1;
            }
            else
                return 3;
        }
        else
            return 2;
    }
}
exports.default = new AuthService();
