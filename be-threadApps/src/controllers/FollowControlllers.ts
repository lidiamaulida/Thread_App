import { Request, Response } from "express";
import FollowServices from "../services/FollowServices";

export default new class FollowControllers {
    async followUser(req: Request, res: Response) {
        try {
            await FollowServices.followUser(req, res)
        } catch (error) {
            throw error 
        }
    }
    async unfollowUser(req: Request, res: Response) {
        try {
            await FollowServices.unfollowUser(req, res)
        } catch (error) {
            throw error
        }
    }

    async getllAllFollows(req: Request, res: Response) {
        try {
          const userId = res.locals.loginSession
          const type   = (req.query.type ?? "") as string
          const limit  = (req.query.limit ?? 0) as number

         const followService = await FollowServices.getFollow(userId, type, limit)
         return res.status(200).json(followService)
        } catch (error) {
            throw error
        }
    }
}