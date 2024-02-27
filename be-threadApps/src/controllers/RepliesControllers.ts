import { Request, Response } from "express";
import RepliesServices from "../services/RepliesServices";

export default new class RepliesControllers {
    async createReply(req: Request, res: Response) {
        try {
            await RepliesServices.createReplies(req, res)
        } catch (error) {
            throw error
        }
    }

    async getAllReplies(req: Request, res: Response) {
        try {
            await RepliesServices.getAllReplies(req, res)
        } catch (error) {
            throw error
        }
    }

    async getReply(req: Request, res:Response){
        try {
            await RepliesServices.getReply(req, res)
        } catch (error) {
            throw error
        }
    }

    async deleteReply(req: Request, res: Response) {
        try {
            await RepliesServices.deleteReply(req, res)
        } catch (error) {
            throw error
        }
    }
}