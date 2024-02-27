import { Repository } from "typeorm";
import { Thread } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary";
import { Request, Response } from "express";
import { ThreadSchema } from "../utils/validator/ThreadValidator";

export default new class ThreadServices {
  private readonly TreadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.TreadRepository.createQueryBuilder("thread")
        .leftJoin("thread.user", "user")
        .leftJoin("thread.likes", "likes")
        .leftJoin("thread.replies", "replies")
        .addSelect(["user.userName", "user.fullName", "user.profil_picture"])
        .loadRelationCountAndMap("thread.likesCount", "thread.likes")
        .loadRelationCountAndMap("thread.repliesCount", "thread.replies")
        .orderBy({"thread.id": "DESC",})
        .getMany();

      return res.status(200).json({
        message: "succes get all thread",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error while get thread" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      // const threadDetail = await this.TreadRepository.findOne({
      //   where: { id },
      //   relations: ["user"],
      // });

      const threadDetail = await this.TreadRepository.createQueryBuilder("thread")
        .leftJoin("thread.user", "user")
        .leftJoin("thread.likes", "likes")
        .leftJoin("thread.replies", "replies")
        .addSelect(["user.userName", "user.fullName", "user.profil_picture"])
        .loadRelationCountAndMap("thread.likesCount", "thread.likes")
        .loadRelationCountAndMap("thread.repliesCount", "thread.replies")
        .orderBy({"thread.id": "DESC",})
        .where("thread.id=:id", {id})
        .getOne();

      if (!threadDetail) {
        return res.status(404).json({ message: "thread id not found" });
      } else {
        return res.status(200).json({
          message: "succes get thread",
          data: threadDetail,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "server error while get thread" });
    }
  }

  async createThreada(req: Request, res: Response): Promise<Response> {
    try {
      const loginSessions = res.locals.loginSession;
      const content = req.body.content
      let image = null

      if(req.file) {
        image = res.locals.filename
      }

      const { error, value } = ThreadSchema.validate({content, image});
      if (error) return res.status(400).json(error.details[0].message);

      let iscloudinary = null
      if( image != null) {
        cloudinary.upload();
        const cloudinaryRes = await cloudinary.destination(value.image);
        iscloudinary = cloudinaryRes.secure_url
      }

      // const obj = {
      //   ...value,
      //   image: iscloudinary,
      //   user: {
      //     id: loginSessions.obj.id,
      //   },
      // };

      const objectData = this.TreadRepository.create({
        content: req.body.content,
        image: iscloudinary ,
        user: {
              id: loginSessions.obj.id,
            }
      });

      console.log( objectData , "berhasilkah wirr");

      const newThread = await this.TreadRepository.save(objectData);
      return res.status(200).json({
        message: "success create Thread",
        data: newThread,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }

  async deleteThread(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const response = await this.TreadRepository.delete(id);

      return res
        .status(200)
        .json({ message: "succes deleting thread", data: response });
    } catch (error) {
      return res.status(500).json({ message: "error while deleting thread" });
    }
  }
};
