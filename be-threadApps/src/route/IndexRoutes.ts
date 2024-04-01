import * as express from "express"
import ThreadControllers from "../controllers/ThreadControllers"
import UserControllers from "../controllers/UserControllers"
import AuthMiddleware from "../middlewares/Auth"
import UploadFile from "../middlewares/UploadFile"
import FollowControlllers from "../controllers/FollowControlllers"
import RepliesControllers from "../controllers/RepliesControllers"
import LikeControllers from "../controllers/LikeControllers"

const routes = express.Router()

//Thread routes 
routes.get("/threads", AuthMiddleware.Auth, ThreadControllers.getAll)
routes.get("/thread/:id", ThreadControllers.getOne)
routes.post("/thread/post", AuthMiddleware.Auth,  UploadFile.upload("image"), ThreadControllers.createThread)
routes.delete("/thread/:id",AuthMiddleware.Auth, ThreadControllers.deleteThread)
routes.get("/threadUser", AuthMiddleware.Auth, ThreadControllers.findThreadUser)
routes.get("/UserLike", AuthMiddleware.Auth, ThreadControllers.findThreadUser)

//user routes
routes.get("/search", AuthMiddleware.Auth, UserControllers.getAll)
routes.get("/user/:id", UserControllers.getOne)
routes.post("/user/register", UserControllers.register)
routes.post("/user/login", UserControllers.login)
routes.get("/auth/check",AuthMiddleware.Auth, UserControllers.check)
routes.get("/Users", UserControllers.getUsers)
routes.get("/suggested",AuthMiddleware.Auth, UserControllers.userSuggested)
routes.patch("/update",AuthMiddleware.Auth, UploadFile.upload("image"), UserControllers.update)

//follow routes
routes.post("/followUser",AuthMiddleware.Auth, FollowControlllers.followUser)
routes.delete("/unfollowUser/:followed_user_id",AuthMiddleware.Auth, FollowControlllers.unfollowUser)
routes.get("/follows", AuthMiddleware.Auth, FollowControlllers.getllAllFollows)


//replies routes
routes.post("/reply/:id", AuthMiddleware.Auth, UploadFile.upload("image"), RepliesControllers.createReply)
routes.get("/replies", RepliesControllers.getAllReplies)
routes.get("/reply/:id", RepliesControllers.getReply)
routes.delete("/reply/:id", RepliesControllers.deleteReply)

//like routes
routes.post("/like/:id", AuthMiddleware.Auth, LikeControllers.createLike)
routes.delete("/unlike/:thread_id", AuthMiddleware.Auth, LikeControllers.unLike);
routes.get("/likes", LikeControllers.getAllLike)
routes.get("/like/:id",AuthMiddleware.Auth, LikeControllers.getLike)

export default routes