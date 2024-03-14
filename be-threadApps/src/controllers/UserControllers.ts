import { Request, Response } from "express";
import UserServices from "../services/UserServices";


export default new class UserControllesr {
    async getAll(req: Request, res: Response) {
        try {
            const keyword = (req.query.keyword ?? "") as string
            const loginSession = res.locals.loginSession.obj.id
            
            // const limit  = (req.query.limit ?? 0) as number

            await UserServices.findAllWithFollowStatus(req, res, keyword, loginSession)
        } catch (error) {
            throw error
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            await UserServices.findOne(req, res)
        } catch (error) {
            throw error
        }
    }

    async register(req: Request, res: Response) {
        try {
            await UserServices.register(req, res)
        } catch (error) {
            throw error
        }
    }

    async login(req: Request, res: Response) {
        try {
            await UserServices.login(req, res)
        } catch (error) {
            throw error
        }
    }

    async check(req: Request, res: Response) {
        try {
            await UserServices.check(req, res)
        } catch (error) {
            throw error
        }
    }
}