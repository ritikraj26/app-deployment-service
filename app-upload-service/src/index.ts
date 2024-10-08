import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import path from "path";
import { generate } from "./utils";
import { getAllFiles } from "./file";
import { uploadFile } from "./aws";
import { createClient } from "redis";

// connect to redis
const redisClient = createClient();
redisClient.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate();
    await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`));
    
    const files = getAllFiles(path.join(__dirname,`output/${id}`));
    // uploading each file to S# bucket
    files.forEach(async file => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    });

    // pushing the id to the build queue
    redisClient.lPush("build-queue", id);
    res.json({
        id: id,
    });
});
app.listen(3000);