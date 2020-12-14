/*
  Para la subida de archivos al S3.
  Guía: Documentación de AWS S3.
*/

// Importando librerías
const AWS = require("aws-sdk");
const csv = require ('csvtojson');
require('dotenv').config();

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

const uploadToS3 = (fileInfo, fileData) =>
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
})

const getFileToS3 = async(path) => {
  const s3 = new AWS.S3(credentials);
  const parametrosGetObject = {
    Bucket: S3_BUCKET,
    Key: path
  }
  const stream = s3.getObject(parametrosGetObject).createReadStream();
  // convert csv file (stream) to JSON format data
  const json = await csv().fromStream(stream);
  return json;
}

module.exports = {
  uploadToS3,
  getFileToS3
}