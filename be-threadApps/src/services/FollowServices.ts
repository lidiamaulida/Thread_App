import { Repository } from "typeorm";
import { Follows } from "../entities/Follows";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { redisClient } from "../libs/redis";

export default new class followServices {
  private readonly FollowRepository: Repository<Follows> =
    AppDataSource.getRepository(Follows);
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async followUser(req: Request, res: Response): Promise<Response> {
    const data = await redisClient.get('follows')
    if(data){
      await redisClient.del('follows')
    }
    try {
      const { followedUserId } = req.body;
      const followerUserId = res.locals.loginSession.obj.id;

      if (followedUserId === followerUserId) {
        return res.status(400).json({ message: "cannot follow your self!" });
      }

      const followedUser = await this.UserRepository.findOne({
        where: { id: followedUserId },
      });
      const followerUser = await this.UserRepository.findOne({
        where: { id: followerUserId },
      });

      if (!followedUser || !followerUser) {
        return res.status(404).json({ message: "user not found" });
      }

      const existingFollow = await this.FollowRepository.findOne({
        where: {
          followed: { id: followedUser.id },
          follower: { id: followerUser.id },
        },
      });

      if (existingFollow) {
        return res.status(400).json({ message: "already following this user" });
      }

      const newFollow = this.FollowRepository.create({
        follower: followerUser,
        followed: followedUser,
      });

      const respnse = await this.FollowRepository.save(newFollow);
      return res
        .status(200)
        .json({ message: "succes followed this user", data: respnse });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "failed followed this user" });
    }
  }

  async unfollowUser(req: Request, res: Response): Promise<Response> {
    const data = await redisClient.get('follows')
    if(data){
      await redisClient.del('follows')
    }
    try {
      const followed_user_id = parseInt(req.params.followed_user_id, 10);
      const followerUserId = res.locals.loginSession.obj.id;

      const existingFollow = await this.FollowRepository.findOne({
        where: {
          follower: { id: followerUserId },
          followed: { id: followed_user_id },
        },
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

  async getFollow(loginSession: any, queryType: string, querylimit: number): Promise<any> {
    try {
      let follows: Follows[];
      
      if (queryType === "followings") {
        follows = await this.FollowRepository.find({
          take: querylimit,
          where: {
            follower: {
              id: loginSession.obj.id,
            },
          },
          relations: ["followed"],
        });

        return follows.map((follow) => ({
          id: follow.id,
          user_id: follow.followed.id,
          userName: follow.followed.userName,
          fullName: follow.followed.fullName,
          email: follow.followed.email,
          profil_picture: follow.followed.profil_picture,
          profil_description: follow.followed.profil_description,
          is_followed: true,
        }));

      } else if (queryType === "followers") {
        follows = await this.FollowRepository.find({
          take: querylimit,
          where: {
            followed: {
              id: loginSession.obj.id,
            },
          },
          relations: ["follower"],
        });
      }

        return Promise.all(
          follows.map(async (data) => {
            const isFollowed = await this.FollowRepository.count({
              where: {
                followed: {
                  id: data.follower.id,
                },
                follower: {
                  id: loginSession.obj.id,
                },
              },
            });

            return {
              id: data.id,
              user_id: data.follower.id,
              userName: data.follower.userName,
              fullName: data.follower.fullName,
              email: data.follower.email,
              profil_picture: data.follower.profil_picture,
              profil_description: data.follower.profil_description,
              is_followed: isFollowed > 0
            };
          })
        );
    
    } catch (error) {
      throw new Error(error.message);
    }
  }
};


