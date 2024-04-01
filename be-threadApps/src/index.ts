import { AppDataSource } from "./data-source";
import * as express from "express"
import * as cors from "cors"
import 'dotenv/config'
import routes from "./route/IndexRoutes";
import { redisClient } from "./libs/redis";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    redisClient.on("error redis", (error) => console.log(error));

    redisClient.on('connect', function() {
      console.log('Connected!');
    });

    const corsConfig = {
      origin: 'http://localhost:5173'
    }
    
    app.use(cors(corsConfig))
    app.use(express.json())
    app.use('/api/v1', routes)

    redisClient.connect()

    app.listen(process.env.PORT, () => console.log(`server runing on port : ${process.env.PORT}`))
  })
  .catch((error) => console.log(error));
