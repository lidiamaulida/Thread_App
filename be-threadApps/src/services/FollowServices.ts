import { Repository } from "typeorm"
import { Follows } from "../entities/Follows"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { User } from "../entities/User"

export default new class followServices {
    private readonly FollowRepository: Repository<Follows> = AppDataSource.getRepository(Follows)
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

    async followUser(req: Request, res: Response) : Promise<Response> {
        try {
            const { followedUserId }  = req.body
            const followerUserId = res.locals.loginSession.obj.id

            if(followedUserId === followerUserId) {
                return res.status(400).json({message: "cannot follow your self!"})
            }
            
            const followedUser = await this.UserRepository.findOne({ where: { id: followedUserId } });
            const followerUser = await this.UserRepository.findOne({where: {id: followerUserId}})
            
            if(!followedUser || !followerUser) {
                return res.status(404).json({message: "user not found"})
            }

            const existingFollow = await this.FollowRepository.findOne({
                where: { 
                    followed: {id: followedUser.id} ,
                    follower: {id: followerUser.id},
                }
            })

            
            if(existingFollow){
                return res.status(400).json({message: "already following this user"})
            }

            const newFollow = this.FollowRepository.create({
                follower: followerUser,
                followed: followedUser
            })

            const respnse = await this.FollowRepository.save(newFollow)
            return res.status(200).json({message: "succes followed this user", data: respnse})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "failed followed this user"})     
        }
    }

    async unfollowUser(req: Request, res: Response): Promise<Response> {
        try {
            const followedUserId = parseInt(req.params.id, 10);
            const followerUserId = res.locals.loginSession.obj.id;
    
            const existingFollow = await this.FollowRepository.findOne({
                where: {
                    follower: { id: followerUserId },
                    followed: { id: followedUserId }
                }
            });

            console.log(existingFollow);
            
            if (!existingFollow) {
                return res.status(400).json({ message: "Not following this user" });
            }
    
            await this.FollowRepository.delete(existingFollow);
            return res.status(200).json({ message: "Successfully unfollowed user" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Failed to unfollow user" });
        }
    }

    async getAllFllowing (req:Request, res: Response) : Promise<Response> {
        try {
            const userId = res.locals.loginSession.obj.id
            console.log(userId);
            const following = await this.FollowRepository.find({
             where: {follower : {id: userId}}, 
             relations: ["followed"]
        })

        console.log(following, "following");

        return res.status(200).json({messsage: "succes get all following", data: following})
        } catch (error) {
            return res.status(500).json({message: "failed to get following"})
        }
    }

    async getAllFollowers(req: Request, res:Response) : Promise<Response> {
        try {
            const userId = res.locals.loginSession.obj.id
            const followers = await this.FollowRepository.find({
                where: {followed: {id: userId} },
                relations: {follower: true},
            })

            return res.status(200).json({message: "succes get all followers", data: followers})
        } catch (error) {
            return res.status(500).json({message: "failed get followers"})
        }
    }
}