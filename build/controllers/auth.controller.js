"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    async sign(req, res, next) {
        try {
            const { login, password } = req.body;
            const j = await auth_service_1.default.verifyLoginPassword(login, password);
            if (j === 1) {
                res.cookie("httpToken", "EkVG34V42zv0hElV", {
                    maxAge: 6 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                return res.json({ success: true, token: "rXlbhbyQREH6fJ2Y" });
            }
            return res.json({ success: false, err: j });
        }
        catch (e) {
            next(e);
        }
    }
    async verif(req, res, next) {
        if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
            return res.sendStatus(401).json({ success: false });
        try {
            if (req.cookies.httpToken === "EkVG34V42zv0hElV") {
                res.cookie("httpToken", "EkVG34V42zv0hElV", {
                    maxAge: 6 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                return res.json({ success: true });
            }
            return res.json({ success: false });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.default = new AuthController();
