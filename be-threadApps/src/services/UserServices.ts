import { Equal, In, Not, Repository } from "typeorm";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { loginSchema, registerSchema, updateUserSchema } from "../utils/validator/UserValidaror";
import { Follows } from "../entities/Follows";
import { redisClient } from "../libs/redis";
import cloudinary from "../libs/cloudinary";

export default new class UserServices {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  private readonly FollowRepository: Repository<Follows> =
    AppDataSource.getRepository(Follows);

  async findAll(req: Request, res: Response, keywordd: any): Promise<Response> {
    try {
      const response = await this.UserRepository.createQueryBuilder("user")
        .where("user.userName LIKE :userName", { userName: `%${keywordd}%` })
        .getMany();

      return res.status(200).json({
        message: "get all users",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error while get users" });
    }
  }

  async findAllWithFollowStatus(
    req: Request,
    res: Response,
    keyword: any,
    loginSession: any
  ): Promise<Response> {
    try {
      const users = await this.UserRepository.createQueryBuilder("user")
        .where("user.userName LIKE :userName", { userName: `%${keyword}%` })
        .getMany();

      const promises = users.map(async (data) => {
        const isFollowed = await this.FollowRepository.count({
          where: {
            follower: {
              id: loginSession,
            },
            followed: {
              id: data.id,
            },
          },
        });

        return {
          id: data.id,
          user_id: data.id,
          userName: data.userName,
          fullName: data.fullName,
          email: data.email,
          profil_picture: data.profil_picture,
          profil_description: data.profil_description,
          is_followed: isFollowed > 0,
        };
      });

      const usersWithFollowStatus = await Promise.all(promises);

      return res.status(200).json({
        message: "get all users",
        data: usersWithFollowStatus,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "server error while getting users" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const getOneUser = await this.UserRepository.findOne({
        where: { id },
        relations: ["followers", "following"],
        select: {},
      });
      if (!getOneUser) {
        return res.status(404).json({ message: "user id not found" });
      } else {
        return res.status(200).json({
          message: "succes get user",
          data: getOneUser,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "server error while get user" });
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    const data = await redisClient.get('users')
    if(data){
      await redisClient.del('users')
    }
    try {
      const data = req.body;

      const { error, value } = registerSchema.validate(data);
      if (error) return res.status(400).json(error.details[0].message);

      const hashPassword = await bcrypt.hash(value.password, 10);

      const obj = {
        ...value,
        password: hashPassword,
      };

      const resRegister = await this.UserRepository.save(obj);
      return res.status(200).json({
        message: "success create User",
        data: resRegister,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "server error while create users" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const data = await redisClient.get('users')
    if(data){
      await redisClient.del('users')
    }
    try {
      const data = req.body;

      const { error, value } = loginSchema.validate(data);
      if (error) return res.status(400).json(error.details[0].message);

      const responseData = await this.UserRepository.findOne({
        where: { email: value.email },
        relations: ["followers", "following"],
      });

      if (!responseData)
        return res
          .status(400)
          .json({ error: `Email ${value.email} is not registered` });

      const compairPasssword = await bcrypt.compare(
        value.password,
        responseData.password
      );
      if (!compairPasssword) return res.json({ message: `password is wrong` });

      const userForToken = {
        id: responseData.id,
        email: responseData.email,
        userName: responseData.userName,
        fullName: responseData.fullName,
        profil_picture: responseData.profil_picture,
        profil_description: responseData.profil_description,
      };

      const token = jwt.sign({ obj: userForToken }, "NEPOBABY", {
        expiresIn: "5h",
      });

      res.locals.loginSession = userForToken;
      return res.status(200).json({
        message: "login succes",
        token,
        obj: {
          id: responseData.id,
          fullName: responseData.fullName,
          userName: responseData.userName,
          email: responseData.email,
          profil_picture: responseData.profil_picture,
          profil_description: responseData.profil_description,
          followers_count: responseData.followers.length,
          followings_count: responseData.following.length,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "something error whille loggedin" });
    }
  }

  async check(req: Request, res: Response): Promise<Response> {
    const data = await redisClient.get('users')
    if(data){
      await redisClient.del('users')
    }
    try {
      const userLogin = res.locals.loginSession;

      const user = await this.UserRepository.findOne({
        where: {
          id: userLogin.obj.id,
        },
        relations: ["followers", "following"],
      });

      return res.status(200).json({
        message: "token is valid",
        user: {
          id: user.id,
          fullName: user.fullName,
          userName: user.userName,
          email: user.email,
          profil_picture: user.profil_picture,
          profil_description: user.profil_description,
          followers_count: user.followers.length,
          followings_count: user.following.length,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "internal server error", error });
    }
  }

  async findAllwithRedis() {
    let data = await redisClient.get("users");

    if (!data) {
      const dataDb = await this.UserRepository.find();
      const stringDataDb = JSON.stringify(dataDb);
      data = stringDataDb;
      await redisClient.set("users", stringDataDb);
    }

    return JSON.parse(data);
  }

  async Suggested(req: Request, res: Response): Promise<Response> {
    try {
      const userLogin = res.locals.loginSession.obj.id

      const users = await this.UserRepository.find({
        where:{followers: {follower: Equal(userLogin)}}
      })

      const follow = users.map((item) => (item.id))
      follow.push(userLogin)

      const response = await this.UserRepository.find({
        where: {
          id: Not(In(follow.map(item => item)))
        }
      })

      const promises = response.map( (data) => {

        return {
          ...data,
          is_followed: false,
        };
      });

      
      return res.status(200).json({
        message: "get all users",
        data: promises,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error while get user" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
        const userId = res.locals.loginSession.obj.id;
        const data = req.body;
        let image = null;

        if (req.file) {
            image = res.locals.filename;
        }

        console.log(image, "ini poto");
        const { error, value } = updateUserSchema.validate(data, image);
        if (error) return res.status(400).json(error.details[0].message);
        console.log(value.image, "inii");
        
        let iscloudinary = null
        if( image != null) {
          cloudinary.upload();
          const cloudinaryRes = await cloudinary.destination(image);
          iscloudinary = cloudinaryRes.secure_url
        } 

        const userToUpdate = await this.UserRepository.findOne({where:{id: userId}});
        if (!userToUpdate) {
            return res.status(404).json({ message: "User not found" });
        }

        //Perbarui properti profil_picture jika ada
        if (image !== null) {
            userToUpdate.profil_picture = iscloudinary;
        }
        
        // Perbarui properti lainnya sesuai dengan nilai yang diterima dari body
        userToUpdate.userName = value.userName;
        userToUpdate.fullName = value.fullName;
        userToUpdate.email = value.email;
        userToUpdate.profil_description = value.profil_description;

        // Simpan perubahan pada entitas pengguna yang diperbarui
        const updatedUser = await this.UserRepository.save(userToUpdate);

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while updating user" });
    }
 }

};
