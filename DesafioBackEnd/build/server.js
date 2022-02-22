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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const tag_controller_1 = require("./controller/tag.controller"); // import the tag controller
const tool_controller_1 = require("./controller/tool.controller"); // import the tool controller
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // init the application
        this.configuration();
        this.routes();
    }
    /**
     * Method to configure the server,
     * A API responde na porta 3000
     **/
    configuration() {
        this.app.set('port', 3000);
        // Add a list of allowed origins.
        // If you have more origins you would like to add, you can add them to the array below.
        const allowedOrigins = ['http://localhost:3001'];
        const options = {
            origin: allowedOrigins
        };
        this.app.use((0, cors_1.default)(options));
        this.app.use(express_1.default.json());
    }
    /**
     * Method to configure routes
     **/
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.createConnection)({
                type: "postgres",
                host: "localhost",
                port: 5433,
                username: "vuttr",
                password: "vuttr",
                database: "vuttr",
                entities: ["build/database/entities/**/*.js"],
                synchronize: true,
                name: "vuttr"
            });
            this.app.get("/", (req, res) => {
                res.send("Hello world!");
            });
            this.tagController = new tag_controller_1.TagController();
            this.toolController = new tool_controller_1.ToolController();
            this.app.use('/api/tools/', this.toolController.router); //Configure the new routes of the controller tool
            this.app.use('/api/tags/', this.tagController.router); //Configure the new routes of the controller tag
        });
    }
    /**
     * Used to start the server
     **/
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listening ' + this.app.get('port') + ' port.');
        });
    }
}
const server = new Server(); // Create server instance
server.start(); // Execute the server
