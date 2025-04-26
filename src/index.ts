import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import authRoutes from "./routes/authRoutes";
import { connectPostgresDb } from "./config/postgresdb/db";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { PostgresInviteRepository } from "./repositories/postgres/inviteRepository";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import inviteRoutes from "./routes/inviteRoutes";
import { inviteService } from "./services/inviteService";
import { InviteController } from "./controllers/InviteController";
import { MongoUserRepository } from "./repositories/mongodb/userRepository";
import { connectMongoDB } from "./config/mongodb/db";
import { EventServiceImpl } from "./services/eventsService";
import { EventController } from "./controllers/eventsController";
import { MongoEventRepository } from "./repositories/mongodb/eventsRepository"; // Ensure this file exists at the specified path
import EventsRoutes from "./routes/eventsRoute";
import { PostgresEventRepository } from "./repositories/postgres/eventsRepository";
import { connectMysqlDb } from "./config/mysql/db";
import { MySQLUserRepository } from "./repositories/mysql/userRepository";
// import {MongoInviteRepository} from "./repositories/mongodb/inviteRespository";


dotenv.config();
console.log(process.env.MONGO_URI);
const app = express();
const port = 3000;

// // Switch connection to database
// const pgPool = connectPostgresDb();

// // Repositories

// const eventRepository = new PostgresEventRepository(pgPool);
// const userRepository = new PostgresUserRepository(pgPool);
// const inviteRepository = new PostgresInviteRepository(pgPool);

// // Services

// const userService = new UserService(userRepository);
// const innviteService = new inviteService(inviteRepository, userRepository);
// const eventService = new EventServiceImpl(eventRepository);

// // Controllers
// const userController = new UserController(userService);
// const authController = new AuthController(userService);
// const inviteController = new InviteController(innviteService, userService);
// const eventController = new EventController(eventService);

// // Middlewares
// app.use(express.json());
// app.use(loggingMiddleware);

// // Routes
// app.use("/api/users", userRoutes(userController));
// app.use("/api/auth", authRoutes(authController));
// app.use("/api/v1", inviteRoutes(inviteController));//inviteRoutes
// app.use("/api/events", EventsRoutes(eventController));

// // Handle Errors
// app.use(errorMiddleware);

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
// // function connectMongoDB() {
// //   throw new Error("Function not implemented.");
// // }


// // Switch connection to database
// connectMongoDB();


// // Repositories

// const userRepository = new MongoUserRepository()
// const eventRepository = new MongoEventRepository();
// const inviteRepository = new MongoInviteRepository();

// // Services
// const userService = new UserService(userRepository);
// const eventService = new EventServiceImpl(eventRepository);
// const InviteService = new inviteService(inviteRepository, userRepository);

// // Controllers

// const userController = new UserController(userService);
// const authController = new AuthController(userService);
// const eventController = new EventController(eventService);
// const inviteController = new InviteController(InviteService, userService);

// // Middlewares

// app.use(express.json());
// app.use(loggingMiddleware);

// // Routes
// app.use("/api/users", userRoutes(userController));
// app.use("/api/auth", authRoutes(authController));
// app.use("/api/v1", inviteRoutes(inviteController));
// app.use("/api/events", EventsRoutes(eventController));
// // app.use("/api/checkin", checkinRoutes(checkinController));

// // Handle Errors
// app.use(errorMiddleware);

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });



const mysqlPool = connectMysqlDb();

// Repositories
const mysqlUserRepository = new MySQLUserRepository(mysqlPool);

// Services
const mysqlUserService = new UserService(mysqlUserRepository);

//controllers
const mysqlUserController = new UserController(mysqlUserService);

// Routes
app.use("/api/users", userRoutes(mysqlUserController));

// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});