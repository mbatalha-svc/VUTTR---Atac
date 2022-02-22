import "reflect-metadata";
import express, {Request, Response} from 'express';
import { TagController } from './controller/tag.controller';	// import the tag controller
import { ToolController } from './controller/tool.controller';	// import the tool controller
import { createConnection } from "typeorm";
import cors from 'cors';

class Server {
	private toolController: ToolController;
	private tagController: TagController;
	private app: express.Application;

	constructor(){
		this.app = express();	// init the application
		this.configuration();
		this.routes();
	}

	/**
	 * Method to configure the server,
	 * A API responde na porta 3000
	 **/

	public configuration(){
		this.app.set('port', 3000);
		// Add a list of allowed origins.
		// If you have more origins you would like to add, you can add them to the array below.
		const allowedOrigins = ['http://localhost:3001'];

		const options: cors.CorsOptions = {
		  origin: allowedOrigins
		};
		this.app.use(cors(options));
		this.app.use(express.json());
	}

	/**
	 * Method to configure routes
	 **/
	public async routes(){
		await createConnection({
			type: "postgres",
			host: "localhost",
			port: 5433,
			username: "vuttr",
			password: "vuttr",
			database: "vuttr",
			entities: ["build/database/entities/**/*.js"],
			synchronize:true,
			name: "vuttr"
		});
		

		this.app.get("/", (req: Request, res: Response ) => {
			res.send("Hello world!");
		});
		

		this.tagController = new TagController();
		this.toolController = new ToolController();

		this.app.use('/api/tools/', this.toolController.router); //Configure the new routes of the controller tool
		this.app.use('/api/tags/', this.tagController.router); //Configure the new routes of the controller tag
	}

	/**
	 * Used to start the server
	 **/
	public start(){
		this.app.listen(this.app.get('port'), () => {
			console.log('Server is listening '+ this.app.get('port') + ' port.');
		});
	}
}

const server = new Server(); // Create server instance

server.start();	// Execute the server