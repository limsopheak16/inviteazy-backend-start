import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import authRoutes from "./routes/authRoutes";
import { connectPostgresDb } from "./config/postgresdb/db";
// import { EventPostgresUserRepository } from "./repositories/postgres/userRepository";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { PostgresInviteRepository } from "./repositories/postgres/inviteRepository";
import inviteRoutes from "./routes/inviteRoutes";
import { Invite,InviteRepository,InviteService } from "./interfaces/Inviteinterface";
import { inviteService } from "./services/inviteService";
import { InviteController } from "./controllers/InviteController";
import { MongoUserRepository } from "./repositories/mongodb/userRepository";
import { connectMongoDB } from "./config/mongodb/db";
import { EventServiceImpl } from "./services/eventsService";
import { EventController } from "./controllers/eventsController";
import { MongoEventRepository } from "./repositories/mongodb/eventsRepository"; // Ensure this file exists at the specified path
import EventsRoutes from "./routes/eventsRoute";


dotenv.config();
console.log(process.env.MONGO_URI);
const app = express();
const port = 3000;

// Switch connection to database
connectMongoDB();
// const pgPool = connectPostgresDb();

// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new PostgresUserRepository(pgPool);
const inviteRepository = new PostgresInviteRepository(pgPool);

// Services
const userService = new UserService(userRepository);
const InviteService = new inviteService(inviteRepository);

// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);
const inviteController = new InviteController(InviteService);

const eventService = new EventServiceImpl(eventRepository);
const eventController = new EventController(eventService);

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use("/api/invites", inviteRoutes(inviteController));
app.use("/api/events", EventsRoutes(eventController));

// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// function connectMongoDB() {
//   throw new Error("Function not implemented.");
// }

