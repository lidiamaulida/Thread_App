import { Request, Response } from "express";
import LikeSrvices from "../services/LikeSrvices";

export default new class LikeControllrs {
    async createLike(req: Request, res: Response) {
        try {
            await LikeSrvices.createLike(req, res)
        } catch (error) {
            throw error
        }
    }

    async unLike(req: Request, res: Response) {
        try {
            await LikeSrvices.unlike(req, res)
        } catch (error) {
            throw error
        }
    }

    async getAllLike(req: Request, res: Response) {
        try {
            await LikeSrvices.getlikes(req, res)
        } catch (error) {
            throw error
        }
    }

    async getLike(req: Request, res: Response) {
        try {
            await LikeSrvices.getLike(req, res)
        } catch (error) {
            throw error
        }
    }
}