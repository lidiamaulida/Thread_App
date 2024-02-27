import { Request, Response } from "express";
import UserServices from "../services/UserServices";


export default new class UserControllesr {
    async getAll(req: Request, res: Response) {
        try {
            await UserServices.findAll(req, res)
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