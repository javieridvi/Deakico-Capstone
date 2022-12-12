import aws from 'aws-sdk';
import { randomBytes } from 'node:crypto';

const bucketName = "deakico-image-bucket";
const region = "us-east-1";
const accessKeyId = process.env.IMAGE_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.IMAGE_BUCKET_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',

})

export default async function getUploadImageUrl(path:string) {
  // const imageName = randomBytes(16).toString('hex');
  const imageName = path + randomBytes(16).toString('hex');

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL

}