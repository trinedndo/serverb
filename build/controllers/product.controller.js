"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const model_1 = require("../model");
const path_1 = __importDefault(require("path"));
const type_controller_1 = __importDefault(require("./type.controller"));
const brand_controller_1 = __importDefault(require("./brand.controller"));
class productsController {
    async create(req, res, next) {
        if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
            return res.sendStatus(401);
        try {
            const id = (0, uuid_1.v4)();
            let image = null;
            if (req.files) {
                image = req.files.img;
            }
            const fileName = (0, uuid_1.v4)() + ".jpg";
            if (!image)
                return res.send("upload image");
            if (image)
                image.mv(path_1.default.resolve(__dirname, "..", "..", "static", fileName));
            console.log(req.body.brand);
            const brand = await brand_controller_1.default.CheckByTag(req.body.brand);
            const type = await type_controller_1.default.check(req.body.type);
            await model_1.Product.create({ ...req.body, id, img: fileName, brand, type });
            return res.json({ ...req.body, id, img: fileName, brand, type });
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        var _a;
        if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
            return res.sendStatus(401);
        try {
            let info = req.body;
            let isSN = false;
            const fileImg = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img;
            let img = "";
            for (let [key, value] of Object.entries(info)) {
                if (key !== "id") {
                    isSN = true;
                    break;
                }
            }
            if (fileImg) {
                img = (0, uuid_1.v4)() + ".jpg";
                fileImg.mv(path_1.default.resolve(__dirname, "..", "..", "static", img));
                info.img = img;
                isSN = true;
            }
            if (isSN) {
                await model_1.Product.update({ ...info }, { where: { id: info.id } });
                return res.json({ success: true, extra: "updated" });
            }
            else {
                return res.json({ success: true, extra: "nothing" });
            }
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
            return res.sendStatus(401);
        try {
            await model_1.Product.destroy({ where: { id: req.body.id } });
            return res.json({ success: true });
        }
        catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            return res.json(await model_1.Product.findAll());
        }
        catch (e) {
            next(e);
        }
    }
    async getOne(req, res, next) {
        try {
            return res.json(await model_1.Product.findOne({ where: { id: req.params.id } }));
        }
        catch (e) {
            next(e);
        }
    }
}
exports.default = new productsController();
