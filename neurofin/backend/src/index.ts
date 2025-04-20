import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import express from "express";
import cors from "cors";
import { PlatformExpress } from "@tsed/platform-express";
import "@tsed/swagger";
import { AuthController } from "./controllers/AuthController";

@Configuration({
  mount: {
    "/api": [
      AuthController
    ]
  },
  swagger: [
    {
      path: "/docs",
      specVersion: "3.0.3",
      spec: {
        info: {
          title: "NeuroFin API",
          version: "1.0.0",
          description: "API para la aplicación NeuroFin"
        }
      }
    }
  ],
  middlewares: [
    cors(),
    express.json(),
    express.urlencoded({ extended: true })
  ],
  port: process.env.PORT || 8000
})
class Server {
  @Inject()
  app!: PlatformApplication;

  @Configuration()
  settings!: Configuration;
}

async function bootstrap() {
  try {
    const server = await PlatformExpress.bootstrap(Server);
    await server.listen();
    console.log(`Server running at http://localhost:${process.env.PORT || 8000}`);
    console.log(`Swagger disponible en http://localhost:${process.env.PORT || 8000}/docs`);
  } catch (error) {
    console.error(error);
  }
}

bootstrap(); 