import { Repository } from "typeorm";
import { Thread } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary";
import { Request, Response } from "express";
import { ThreadSchema } from "../utils/validator/ThreadValidator";
import { redisClient } from "../libs/redis";

export default new class ThreadServices {
  private readonly TreadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(reqQuery?: any, loginSession?: any,): Promise<any> {
      try {
        let data = await redisClient.get("thread");
        const limit = parseInt(reqQuery.limit ?? 0);

        if (!data) {
        const threads = await this.TreadRepository.find({
        relations: ["user", "likes.user", "replies"],
        order: {
          id: "DESC",
        },
        take: limit,
        });

        const stringDataDb = JSON.stringify(threads);
        data = stringDataDb;
        await redisClient.set("thread", stringDataDb);

        }
        const response = JSON.parse(data);

       return response.map((element) => ({
        id: element.id,
        content: element.content,
        image: element.image,
        postedAt: element.postedAt,
        user: element.user,
        repliesCount: element.replies.length,
        likesCount: element.likes.length,
        is_liked: element.likes.some(
          (like: any) => like.user.id === loginSession.obj.id
        ),
      }));
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
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
    const data = await redisClient.get('thread')
    if(data){
      await redisClient.del('thread')
    }  
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
    const data = await redisClient.get('thread')
    if(data){
      await redisClient.del('thread')
    }
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

  async findThreadUser(reqQuery?: any, loginSession?: any,): Promise<any> {
    try {
      const limit = parseInt(reqQuery.limit ?? 0);

      const threads = await this.TreadRepository.find({
      relations: ["user", "likes.user", "replies"],
      where: {
        user: {id: loginSession.obj.id }
      },
      order: {
        id: "DESC",
      },
      take: limit,
    });

     return threads.map((element) => ({
      id: element.id,
      content: element.content,
      image: element.image,
      postedAt: element.postedAt,
      user: element.user,
      repliesCount: element.replies.length,
      likesCount: element.likes.length,
      is_liked: element.likes.some(
        (like: any) => like.user.id === loginSession.obj.id
      ),
    }));
    } catch (error) {
    console.log(error);
    throw new Error(error.message);
    }
  }

//   async findByLike(reqQuery?: any, loginSession?: any,): Promise<any> {
//     try {
//     const limit = parseInt(reqQuery.limit ?? 0);

//     const threads = await this.TreadRepository.createQueryBuilder("thread")
//     .leftJoin("thread.likes", "likes")
//     .leftJoin("likes.user", "user")
//     .orderBy({"thread.id": "DESC",})
//     .where("thread.likes.user.id=:loginSession", {loginSession})
//     .getMany()

//      return threads.map((element) => ({
//       id: element.id,
//       content: element.content,
//       image: element.image,
//       postedAt: element.postedAt,
//       user: element.user,
//       repliesCount: element.replies.length,
//       likesCount: element.likes.length,
//       is_liked: element.likes.some(
//         (like: any) => like.user.id === loginSession.obj.id
//       ),
//     }));
//     } catch (error) {
//     console.log(error);
//     throw new Error(error.message);
//     }
//   }

async findByLike(reqQuery?: any, loginSession?: any): Promise<any> {
    try {
      const limit = parseInt(reqQuery?.limit) || 0;
      const userId = loginSession?.obj?.id;
  
      if (!userId) {
        throw new Error("User ID not found in login session.");
      }
  
      // Buat query untuk mendapatkan thread yang disukai oleh pengguna yang sesuai
      const threads = await this.TreadRepository.createQueryBuilder('thread')
      .innerJoinAndSelect('thread.likes', 'like')
      .innerJoinAndSelect('like.user', 'user')
      .where('thread.likes.user.id = :userId', { userId })
      .getMany();
  
      const formattedThreads = threads.map((thread: any) => ({
        id: thread.id,
        content: thread.content,
        image: thread.image,
        postedAt: thread.postedAt,
        user: thread.user,
        repliesCount: thread.replies.length,
        likesCount: thread.likes.length,
        is_liked: thread.likes.some(
          (like: any) => like.user.id === loginSession.obj.id
        ),
      }));
  
      return formattedThreads;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch liked threads.");
    }
  }
  
  

};