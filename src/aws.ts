import { S3 } from "aws-sdk";
import fs from "fs";

// replace with your own credentials
const s3 = new S3({
    accessKeyId: "AKIAREAV3T6VJLEMDUDU",
    secretAccessKey: "u3wGBLc7j1En36N7OoKXgxjgbRISIr5XeVHnADDo",
})


export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "marianaai",
        Key: fileName,
    }).promise();
    console.log(response);
}