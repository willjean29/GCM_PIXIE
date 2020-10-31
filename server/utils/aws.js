const AWS = require("aws-sdk");
require('dotenv').config({ path: "variables.env"});

const { IAM_USER_KEY, IAM_USER_SECRET, S3_BUCKET } = process.env;

AWS.config.region = "us-east-1";

const credentials = {
  apiVersion: "2010-12-01",
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
};

/**
 * Subir a S3
 * @param {Object} fileInfo Contiene la data del usuario
 * @param {String} fileInfo.name Nombre del archivo
 * @param {String} fileInfo.path Ruta donde se guardara
 * @param {Object} fileData <Data> del archivo
 * @returns {Object} Validacion
 */

module.exports.uploadToS3 = (fileInfo, fileData) =>
  new Promise((resolve) => {
    const s3bucket = new AWS.S3(credentials);
    s3bucket.createBucket(() => {
      const { name, path } = fileInfo;

      const params = {
        Bucket: S3_BUCKET,
        Key: `${path}/${name}`,
        Body: fileData,
        ACL: "public-read",
      };
      console.log({ params });
      s3bucket.upload(params, (err, data) => {
        console.log({ err });
        if (err) return resolve({ ok: false, err });
        resolve({ ok: true, data });
      });
    });
  });
