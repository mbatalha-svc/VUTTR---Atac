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
exports.ToolService = void 0;
const typeorm_1 = require("typeorm");
const tool_repository_1 = require("./../repository/tool.repository");
class ToolService {
    constructor() {
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            const tools = yield this.toolRepository.find({ relations: ['tags'] });
            return tools;
        });
        this.queryById = (id) => __awaiter(this, void 0, void 0, function* () {
            const tools = yield this.toolRepository.find({ where: { id: id }, relations: ['tags'] });
            return tools;
        });
        this.create = (tool) => __awaiter(this, void 0, void 0, function* () {
            const newTool = yield this.toolRepository.save(tool);
            return newTool;
        });
        this.update = (tool, id) => __awaiter(this, void 0, void 0, function* () {
            const updatedTool = yield this.toolRepository.update(id, tool);
            return updatedTool;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedTool = yield this.toolRepository.delete(id);
            return deletedTool;
        });
        this.toolRepository = (0, typeorm_1.getConnection)("vuttr").getCustomRepository(tool_repository_1.ToolRepository);
    }
}
exports.ToolService = ToolService;
