import { Repository } from "typeorm"
import { Replies } from "../entities/Replies"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { ReplySchema } from "../utils/validator/ThreadValidator"
import cloudinary from "../libs/cloudinary"

export default new class RepliesServices {
    private readonly RepliesRepository: Repository<Replies> = AppDataSource.getRepository(Replies)

    async createReplies(req: Request, res: Response) : Promise<Response> {
        try {
            const userId = res.locals.loginSession.obj.id
            const Thread =  parseInt(req.params.id, 10);
            const content = req.body.content
            let image =  null

            if(req.file) {
                image = res.locals.filename
              }
                
                const {error, value} = ReplySchema.validate({content, image})
                if(error) return res.status(400).json(error.details[0].message);
                
                let iscloudinary = null
                if( image != null) {
                cloudinary.upload();
                const cloudinaryRes = await cloudinary.destination(image);
                iscloudinary = cloudinaryRes.secure_url
                }
            

                const objectData = this.RepliesRepository.create({
                    content: req.body.content,
                    image: iscloudinary ,
                    user: {
                          id: userId
                        },
                    thread: {
                        id: Thread 
                    }
                  });
            

            // console.log(objectData, "reply");
            const newReply = await this.RepliesRepository.save(objectData)
            return res.status(200).json({message: "succes create reply", data: newReply})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "interal server error"})
        }
    }

    async getAllReplies(req: Request, res: Response) : Promise<Response> {
        try {
            const response = await this.RepliesRepository.find({
                relations: ["thread", "user"],
                select: {
                    user: {
                      id: true,
                      userName: true,
                      fullName: true,
                      profil_picture: true,
                    },
                    thread: {
                        id: true,
                        content: true,
                    }
                  },
            })

            return res.status(200).json({message: "succes geting all reply", data: response})
        } catch (error) {
            return res.status(500).json({message: "error while geting reply"})
        }
    }

    async getReply(req: Request, res: Response) : Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10)
            const reply = await this.RepliesRepository.find({
                // where: { id: id },
                // relations: ["thread", "user"],
                // select: {
                //     user: {
                //       id: true,
                //       userName: true,
                //       fullName: true,
                //       profil_picture: true,
                //     },
                //     thread: {
                //         id: true,
                //         content: true,
                //     }
                //   },
                where: {
                    thread: {
                      id: id,
                    },
                  },
                  relations: ["user"],
                  select: {
                        user: {
                          id: true,
                          userName: true,
                          fullName: true,
                          profil_picture: true,
                        },
                        thread: {
                            id: true,
                            content: true,
                        }
                      },
            })

            return res.status(200).json({message: "succes geting reply", data: reply})
        } catch (error) {
            return res.status(500).json({message: "error while geting reply"})
        }
    }

    async deleteReply(req: Request, res: Response) : Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10)
            if (isNaN(id)) {
                return res.json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type integer"
                });
            }

            const response = await this.RepliesRepository.delete(id)

            return res.status(200).json({message: "succes deleting reply", data: response})
        } catch (error) {
            return res.status(200).json({message: "error while deleting reply"})
        }
    }
}