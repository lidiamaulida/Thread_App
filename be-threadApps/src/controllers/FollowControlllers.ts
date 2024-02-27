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

    async getAllFollowing(req: Request, res: Response) {
        try {
            await FollowServices.getAllFllowing(req, res)
        } catch (error) {
            throw error
        }
    }

    async gellAllFollowers(req: Request, res: Response) {
        try {
            await FollowServices.getAllFollowers(req, res) 
        } catch (error) {
            throw error
        }
    }
}