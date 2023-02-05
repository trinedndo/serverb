"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const model_1 = require("../model");
class brandsController {
    async create(req, res, next) {
        if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
            return res.sendStatus(401);
        try {
            let array = [];
            for (let i = 0; i < req.body.length; i++) {
                const tag = req.body[i];
                const id = (0, uuid_1.v4)();
                await model_1.Brand.create({ tag, id });
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
            await model_1.Brand.update({ ...req.body }, { where: { id: req.body.id } });
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
            await model_1.Brand.destroy({ where: { id: req.body.id } });
            return res.json({ success: true });
        }
        catch (e) {
            next(e);
        }
    }
    async CheckByTag(itag) {
        const len = await model_1.Brand.findOne({ where: { tag: itag } });
        if (len) {
            return len.dataValues.id;
        }
        else {
            const id = (0, uuid_1.v4)();
            await model_1.Brand.create({ tag: itag, id });
            return id;
        }
    }
    async CheckById(nid) {
        const find = await model_1.Brand.findOne({ where: { id: nid } });
        if (find)
            return find.dataValues.id;
        else {
            const id = (0, uuid_1.v4)();
            await model_1.Brand.create({ tag: nid, id });
            return id;
        }
    }
    async getAll(req, res, next) {
        try {
            return res.json(await model_1.Brand.findAll());
        }
        catch (e) {
            next(e);
        }
    }
}
exports.default = new brandsController();
