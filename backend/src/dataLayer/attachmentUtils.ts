import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})
const Bucket_Name = process.env.ATTACHMENT_S3_BUCKET
// // TODO: Implement the fileStorage logic
export async function generateUploadUrl(todoId: string): Promise<string> {
        console.log("Generating URL");

        const url = s3.getSignedUrl('putObject', {
            Bucket: Bucket_Name,
            Key: todoId,
            Expires: 1000,
        });
        console.log(url);

        return url as string;
    }