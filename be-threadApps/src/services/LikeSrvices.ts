import { Repository } from "typeorm"
import { Likes } from "../entities/Likes"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { Thread } from "../entities/Thread"

export default new class LikeServices {
    private readonly LikeRepository: Repository<Likes> = AppDataSource.getRepository(Likes)

    private readonly ThreadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

    async createLike(req: Request, res: Response)  : Promise<Response> {
        try {
            const userId = res.locals.loginSession.obj.id
            const thread =  parseInt(req.params.id, 10);
            
            const checkThrad = await this.ThreadRepository.findOne({
                where: {id: thread}
            })

            if(!checkThrad) {
                return res.status(404).json({message: "thread not found"})
            }

            const like = this.LikeRepository.create({
                user: userId  ,
                thread: checkThrad,
            })

            const response = await this.LikeRepository.save(like)
            return res.status(200).json({message: "succes like this thread", data: response})
        } catch (error) {
            return res.status(500).json({message: "error while like thread"})
        }
    }

    async unlike(req: Request, res: Response) : Promise<Response> {
        try {
            const thread =  parseInt(req.params.id, 10);
            const userId = res.locals.loginSession.obj.id
            
            const checkLikes = await this.LikeRepository.findOne({
                where: {
                    user: {id: userId},
                    thread: {id: thread}
                }
            })

            if(!checkLikes) {
                return res.status(400).json({message: "not yet like this thread"})
            }

            const response = await this.LikeRepository.delete(checkLikes)
            return res.status(200).json({message: "succes unlike this thread"})
        } catch (error) {
            return res.status(500).json({message: "error while unlike this thread"})
        }
    }

    async getlikes(req: Request, res: Response) : Promise<Response> {
        try {
           const respnse = await this.LikeRepository.find({
            relations: ["user", "thread"],
            select: {
                user: {
                    id: true,
                    fullName: true,
                    userName: true
                },
                thread: {
                    id: true,
                    content: true
                }
            }
           })

           return res.status(200).json({message: "succes geting all like", data: respnse})
        } catch (error) {
            return res.status(500).json({message: "error while geting all like"})
        }
    }

    async getLike(req: Request, res: Response): Promise<Response> {
        try {
            const thread =  parseInt(req.params.id, 10);

            const like = await this.LikeRepository.findOne({
                where: { id: thread },
                relations: ["user", "thread"],
                select: {
                    user: {
                        id: true,
                        fullName: true,
                        userName: true
                    },
                    thread: {
                        id: true,
                        content: true
                    }
                }
            })

            if(!like) {
                return res.status(200).json({mesage: "cannot find like"})
            }

            return res.status(200).json({mesage: "succes geting like", data: like})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "error while geting like"})
        }
    }
}