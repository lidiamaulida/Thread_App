import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";
import { loadavg } from "os";

export default new class ThreadControllers {
  async getAll(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await ThreadServices.find(req.query, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      throw error
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      await ThreadServices.findOne(req, res);

    } catch (error) {
      throw error
    }
  }

  async createThread(req: Request, res: Response) {
    try {
      await ThreadServices.createThreada(req, res)
    } catch (error) {
      throw error
    }
  }

  async deleteThread(req: Request, res: Response) {
    try {
      await ThreadServices.deleteThread(req, res)
    } catch (error) {
      throw error
    }
  }

  async findThreadUser(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await ThreadServices.findThreadUser(req.query, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      throw error
    }
  }

  async findByLike(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await ThreadServices.findByLike(req.query, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      throw error
    }
  }

};
