import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { InfoUserController } from "./controllers/user/InfoUserController";
import { UpdateUserController } from "./controllers/user/EditeUserController";
import { CreatePostController } from "./controllers/post/CreatePostController";
import { UserController } from "./controllers/user/GetAllUsersController";
import { GetAllPostsController } from "./controllers/post/GetAllPostController";

import { isAuthenticated } from "./middlewares/isAuthticated";
import { DeletePostController } from "./controllers/post/DeletePostController";
import { EditPostController } from "./controllers/post/EditPostController";
import { CommentPostController } from "./controllers/post/CommentPostController";
import { LikeController } from "./controllers/like/LikeController";
import { GetUserByIdController } from "./controllers/user/GetUserByIdController";
import { SendForgotPasswordController } from "./controllers/user/SendForgotPasswordController";
import { ResetPasswordController } from "./controllers/user/ResetPasswordController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { FollowerController } from "./controllers/follower/FollowerController";

const router = Router();

// Auth routes
router.post("/users", new CreateUserController().handle as any);
router.post("/login", new AuthUserController().handle as any);

// Password routes
router.post("/forgot", new SendForgotPasswordController().handle as any);
router.post("/reset", new ResetPasswordController().handle as any);

// Users routes
router.get("/info", isAuthenticated, new InfoUserController().handle as any);
router.get("/profiles", isAuthenticated, new UserController().handle as any);
router.get(
  "/user/:user_id",
  isAuthenticated,
  new GetUserByIdController().handle as any
);
router.delete(
  "/user/:user_id",
  isAuthenticated,
  new DeleteUserController().handle as any
);

// Posts routes
router.put("/edit", isAuthenticated, new UpdateUserController().handle as any);

router.post("/post", isAuthenticated, new CreatePostController().handle as any);
router.get(
  "/posts",
  isAuthenticated,
  new GetAllPostsController().handle as any
);
router.delete(
  "/post/:post_id",
  isAuthenticated,
  new DeletePostController().handle as any
);
router.put(
  "/edit/:post_id",
  isAuthenticated,
  new EditPostController().handle as any
);

router.post(
  "/comment/:post_id",
  isAuthenticated,
  new CommentPostController().handle as any
);

// Like routes
const likeController = new LikeController();
router.post("/like/:post_id", isAuthenticated, likeController.handle as any);
router.get(
  "/likes/:post_id",
  isAuthenticated,
  likeController.getLikesByPostId as any
);
router.get(
  "/likes/:user_id",
  isAuthenticated,
  likeController.getLikesByUserId as any
);
router.delete("/like/:id", isAuthenticated, likeController.deleteLike as any);

const followController = new FollowerController();
router.post("/follow", isAuthenticated, followController.handle as any);
router.delete(
  "/unfollow",
  isAuthenticated,
  followController.deleteFollow as any
);

export { router };
