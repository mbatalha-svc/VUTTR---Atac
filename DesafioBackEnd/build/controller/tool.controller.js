"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolController = void 0;
const express_1 = require("express");
const tool_service_1 = require("../services/tool.service"); // import service
class ToolController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tools = yield this.toolService.index();
            res.json(tools);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tool = req['body'];
            const newTool = yield this.toolService.create(tool);
            res.send(newTool);
        });
        this.queryById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req['params']['id'];
            const tools = yield this.toolService.queryById(Number(id));
            res.send(tools);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tool = req['body'];
            const id = req['params']['id'];
            res.send(this.toolService.update(tool, Number(id)));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req['params']['id'];
            res.send(this.toolService.delete(Number(id)));
        });
        this.toolService = new tool_service_1.ToolService(); // Create a new instance of ToolService
        this.router = (0, express_1.Router)();
        this.routes();
    }
    /**
     * Configure the routes of controller
     **/
    routes() {
        this.router.route('/')
            .get(this.index)
            .post(this.create);
        this.router.route('/:id')
            .get(this.queryById)
            .put(this.update)
            .delete(this.delete);
    }
}
exports.ToolController = ToolController;
