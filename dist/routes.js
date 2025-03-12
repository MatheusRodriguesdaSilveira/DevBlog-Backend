"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const InfoUserController_1 = require("./controllers/user/InfoUserController");
const EditeUserController_1 = require("./controllers/user/EditeUserController");
const CreatePostController_1 = require("./controllers/post/CreatePostController");
const GetAllUsersController_1 = require("./controllers/user/GetAllUsersController");
const GetAllPostController_1 = require("./controllers/post/GetAllPostController");
const isAuthticated_1 = require("./middlewares/isAuthticated");
const DeletePostController_1 = require("./controllers/post/DeletePostController");
const EditPostController_1 = require("./controllers/post/EditPostController");
const CommentPostController_1 = require("./controllers/post/CommentPostController");
const LikePostController_1 = require("./controllers/like/LikePostController");
const GetUserByIdController_1 = require("./controllers/user/GetUserByIdController");
const SendForgotPasswordController_1 = require("./controllers/user/SendForgotPasswordController");
const ResetPasswordController_1 = require("./controllers/user/ResetPasswordController");
const DeleteUserController_1 = require("./controllers/user/DeleteUserController");
const router = (0, express_1.Router)();
exports.router = router;
// Auth routes
router.post("/users", new CreateUserController_1.CreateUserController().handle);
router.post("/login", new AuthUserController_1.AuthUserController().handle);
// Password routes
router.post("/forgot", new SendForgotPasswordController_1.SendForgotPasswordController().handle);
router.post("/reset", new ResetPasswordController_1.ResetPasswordController().handle);
// Users routes
router.get("/info", isAuthticated_1.isAuthenticated, new InfoUserController_1.InfoUserController().handle);
router.get("/profiles", isAuthticated_1.isAuthenticated, new GetAllUsersController_1.UserController().handle);
router.get("/user/:user_id", isAuthticated_1.isAuthenticated, new GetUserByIdController_1.GetUserByIdController().handle);
router.delete("/user/:user_id", isAuthticated_1.isAuthenticated, new DeleteUserController_1.DeleteUserController().handle);
// Posts routes
router.put("/edit", isAuthticated_1.isAuthenticated, new EditeUserController_1.UpdateUserController().handle);
router.post("/post", isAuthticated_1.isAuthenticated, new CreatePostController_1.CreatePostController().handle);
router.get("/posts", isAuthticated_1.isAuthenticated, new GetAllPostController_1.GetAllPostsController().handle);
router.delete("/post/:post_id", isAuthticated_1.isAuthenticated, new DeletePostController_1.DeletePostController().handle);
router.put("/edit/:post_id", isAuthticated_1.isAuthenticated, new EditPostController_1.EditPostController().handle);
router.post("/comment/:post_id", isAuthticated_1.isAuthenticated, new CommentPostController_1.CommentPostController().handle);
// Like routes
const likeController = new LikePostController_1.LikeController();
router.post("/like/:post_id", isAuthticated_1.isAuthenticated, likeController.handle);
router.get("/likes/:post_id", isAuthticated_1.isAuthenticated, likeController.getLikesByPostId);
router.get("/likes/:user_id", isAuthticated_1.isAuthenticated, likeController.getLikesByUserId);
router.delete("/like/:id", isAuthticated_1.isAuthenticated, likeController.deleteLike);
