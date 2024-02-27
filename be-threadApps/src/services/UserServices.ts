import { Repository } from "typeorm";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../utils/validator/UserValidaror";

export default new (class UserServices {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.UserRepository.find();

      return res.status(200).json({
        message: "get all users",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({ message: "server error while get users" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const getOneUser = await this.UserRepository.findOne({
        where: { id },
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
    try {
      // const loginSessions = res.locals.loginSession
      const data = req.body

      const { error, value } = loginSchema.validate(data);
      if (error) return res.status(400).json(error.details[0].message);

      const responseData  = await this.UserRepository.findOne({
        where: { email: value.email },
      });

      // const responseData  = await this.UserRepository.createQueryBuilder()
      // .where("email = :email OR userName = :userName", {email: req.body.email, userName: req.body.userName})
      // .getOne()

      if (!responseData )
      return res.status(400).json({ error: `Email ${value.email} is not registered` });

      const compairPasssword = await bcrypt.compare(
        value.password,
        responseData .password
      );
      if (!compairPasssword) return res.json({ message:`password is wrong` });

      const userForToken = {
        id: responseData.id,
        email: responseData.email,
        userName: responseData.userName,
        fullName: responseData.fullName,
        profil_picture: responseData.profil_picture,
        profil_description: responseData.profil_description,
      }

      const obj = this.UserRepository.create({
        id: responseData .id,
        fullName: responseData .fullName,
        userName: responseData .userName,
        email: responseData.email
      });

      const token = jwt.sign({ obj: userForToken }, "NEPOBABY", { expiresIn: "5h" });

      res.locals.loginSession = userForToken
      return res.status(200).json({
        message: "login succes",
        token,
        obj
      });
    } catch (error) {
      return res.status(500).json({message: "something error whille loggedin"});
    }
  }

  async check(req: Request, res: Response): Promise<Response> {
    try {
     const userLogin = res.locals.loginSession

      const user = await this.UserRepository.findOne({
        where: {
          id: userLogin.obj.id
        }
      })

      return res.status(200).json({message: "token is valid", user})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "internal server error", error})
    }
  }
});
