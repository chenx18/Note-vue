const fs = require('fs');
const path = require('path');
const basePath = path.join(__dirname, '../../../NotesDocument');

//遍历文件夹，获取所有文件夹里面的文件信息

function geFileList(path) {
  var filesList = [];
  var targetObj = {};
  console.log(10,path)
  readFile(path, filesList, targetObj);
  return filesList;
}

//遍历读取文件
function readFile(path, filesList, targetObj) {
  files = fs.readdirSync(path); //需要用到同步读取
  files.forEach(walk);
  function walk(file) {
    states = fs.statSync(path + '/' + file);
    if (states.isDirectory()) {
      var item;
      if (targetObj["children"]) {
        item = {
          name: file,
          children: []
        };
        targetObj["children"].push(item);
      } else {
        item = {
          name: file,
          children: []
        };
        filesList.push(item);
      }
      readFile(path + '/' + file, filesList, item);
    } else {
      console.log(7,path)
      //创建一个对象保存信息
      var obj = new Object();
      obj.size = states.size; //文件大小，以字节为单位
      obj.name = file.replace('.md', ''); //文件名
      obj.path = path + '/' + file; //文件绝对路径
      

      if (targetObj["children"]) {
        var item = {
          name: obj.name,
          value: obj.path
        }
        targetObj["children"].push(item);
      } else {
        var item = {
          name: obj.name,
          value: obj.path
        };
        filesList.push(item);
      }
    }
  }
}

//写入文件utf-8格式
function writeFile(fileName, data) {
  fs.writeFile(fileName, data, 'utf-8',(err)=>{
    console.log(err)
    return;
  })
}


// function createTree(){
  let filesList = geFileList(basePath);
  let str = JSON.stringify(filesList);
  writeFile("tree.json", str);
// }

// export default createTree

