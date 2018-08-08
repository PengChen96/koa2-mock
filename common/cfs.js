/* global require */
/* global module */

const fs = require('fs');

// 读取path下【文件夹的名字和文件名】  返回 Array
const readdir = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
// 读取文件内容   返回 String
const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
};

module.exports = {
  readdir,
  readFile
};