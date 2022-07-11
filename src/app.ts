import express, { Application } from "express";
import cors from "cors";

import morganMiddleware from "./middlewares/morgan.middleware";

class App {
    public express: Application;

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(morganMiddleware);
    }

    private routes(): void {
        this.express.get("/", (req, res) => {
            return res.send("hello world");
        });
    }
}

export default new App().express;
