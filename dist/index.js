"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const userService_1 = require("./services/userService");
const userController_1 = require("./controllers/userController");
const authController_1 = require("./controllers/authController");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const loggingMiddleware_1 = require("./middlewares/loggingMiddleware");
const inviteRoutes_1 = __importDefault(require("./routes/inviteRoutes"));
const inviteService_1 = require("./services/inviteService");
const InviteController_1 = require("./controllers/InviteController");
const userRepository_1 = require("./repositories/mongodb/userRepository");
const db_1 = require("./config/mongodb/db");
const eventsService_1 = require("./services/eventsService");
const eventsController_1 = require("./controllers/eventsController");
const eventsRepository_1 = require("./repositories/mongodb/eventsRepository");
const eventsRoute_1 = __importDefault(require("./routes/eventsRoute"));
const inviteRespository_1 = require("./repositories/mongodb/inviteRespository");
dotenv_1.default.config();
console.log(process.env.MONGO_URI);
const app = (0, express_1.default)();
const port = 3000;
// // // Switch connection to database
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
// // // function connectMongoDB() {
// // //   throw new Error("Function not implemented.");
// // // }
// const mysqlPool = connectMysqlDb();
// // Repositories
// const mysqlUserRepository = new MySQLUserRepository(mysqlPool);
// // Services
// const mysqlUserService = new UserService(mysqlUserRepository);
// //controllers
// const mysqlUserController = new UserController(mysqlUserService);
(0, db_1.connectMongoDB)();
// Repositories
const userRepository = new userRepository_1.MongoUserRepository();
const eventRepository = new eventsRepository_1.MongoEventRepository();
const inviteRepository = new inviteRespository_1.MongoInviteRepository();
// Services
const userService = new userService_1.UserService(userRepository);
const eventService = new eventsService_1.EventServiceImpl(eventRepository);
const InviteService = new inviteService_1.inviteService(inviteRepository, userRepository);
// Controllers
const userController = new userController_1.UserController(userService);
const authController = new authController_1.AuthController(userService);
const eventController = new eventsController_1.EventController(eventService);
const inviteController = new InviteController_1.InviteController(InviteService, userService);
// Middlewares
app.use(express_1.default.json());
app.use(loggingMiddleware_1.loggingMiddleware);
// Routes
app.use("/api/users", (0, userRoutes_1.default)(userController));
app.use("/api/auth", (0, authRoutes_1.default)(authController));
app.use("/api/v1", (0, inviteRoutes_1.default)(inviteController));
app.use("/api/events", (0, eventsRoute_1.default)(eventController));
// app.use("/api/checkin", checkinRoutes(checkinController));
// Handle Errors
app.use(errorMiddleware_1.errorMiddleware);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
