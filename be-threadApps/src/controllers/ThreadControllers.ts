import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";

export default new class ThreadControllers {
  async getAll(req: Request, res: Response) {
    try {
      await ThreadServices.findAll(req, res);

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

};
