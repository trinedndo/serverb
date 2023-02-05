"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const uuid_1 = require("uuid");
class typesController {
    async create(req, res, next) {
        if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
            return res.sendStatus(401);
        try {
            let array = [];
            for (let i = 0; i < req.body.length; i++) {
                const tag = req.body[i];
                const id = (0, uuid_1.v4)();
                await model_1.Type.create({ tag, id });
                array.push({ tag, id });
            }
            return res.json(array);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
            return res.sendStatus(401);
        try {
            await model_1.Type.update({ ...req.body }, { where: { id: req.body.id } });
            return res.json({ success: true });
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
            return res.sendStatus(401);
        try {
            await model_1.Type.destroy({ where: { id: req.body.id } });
            return res.json({ success: true });
        }
        catch (e) {
            next(e);
        }
    }
    async check(itag) {
        const len = await model_1.Type.findOne({ where: { tag: itag } });
        if (len) {
            return len.dataValues.id;
        }
        else {
            const id = (0, uuid_1.v4)();
            await model_1.Type.create({ tag: itag, id });
            return id;
        }
    }
    async getAll(req, res, next) {
        try {
            return res.json(await model_1.Type.findAll());
        }
        catch (e) {
            next(e);
        }
    }
}
exports.default = new typesController();
