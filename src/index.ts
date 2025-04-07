import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import authRoutes from "./routes/authRoutes";
import { connectPostgresDb } from "./config/postgresdb/db";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { PostgresInviteRepository } from "./repositories/postgres/inviteRepository";
import inviteRoutes from "./routes/inviteRoutes";
import { Invite,InviteRepository,InviteService } from "./interfaces/Inviteinterface";
import { inviteService } from "./services/inviteService";
import { InviteController } from "./controllers/InviteController";

dotenv.config();

const app = express();
const port = 3000;

// Switch connection to database
// connectMongoDB();
const pgPool = connectPostgresDb();

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

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use("/api/invites", inviteRoutes(inviteController));

// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
