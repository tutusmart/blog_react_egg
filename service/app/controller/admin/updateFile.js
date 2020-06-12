const BaseController = require('../base');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');
class UpdataController extends BaseController {
  async index() {
    const { ctx } = this;
    console.log(this.app.config);
    
    const stream = await ctx.getFileStream();
    console.log('-----------获取数据 start--------------');
    // console.log(stream);
    console.log('-----------获取数据 end--------------');
    // 基础的目录
    const uplaodBasePath = 'app/public/uploads';
    // 生成文件名
    // const filename = stream.filename;
    const filename = `${Date.now()}${Number.parseInt(Math.random() * 1000)}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');

    this.mkdirsSync(path.join(uplaodBasePath, dirname));
    // 生成写入路径
    const target = path.join(uplaodBasePath, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
    //如果出现错误，关闭管道
      await sendToWormhole(stream);
      this.error(err);
    };
    let file = {};
    if(this.app.config.env == "local"){
        file.filePath = "http://127.0.0.1:" + this.app.config.cluster.listen.port + "/" + path.join(target.slice(4));
    }else{
        file.filePath = "http://blogadmin.tuwei.site/" + path.join(target.slice(4));
    }
    file.fileName = filename;
    file.title = '图片';
    this.success(file);
  }

  async video() {
    const { ctx } = this;

    const stream = await ctx.getFileStream();
    console.log('-----------获取数据 start--------------');
    console.log(stream);
    console.log('-----------获取数据 end--------------');
    // 基础的目录
    const uplaodBasePath = 'app/public/uploads';
    // 生成文件名
    // const filename = stream.filename;
    const filename = `${Date.now()}${Number.parseInt(Math.random() * 1000)}${path.extname(stream.filename).toLocaleLowerCase()}`;

    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');

    this.mkdirsSync(path.join(uplaodBasePath, dirname));
    // 生成写入路径
    const target = path.join(uplaodBasePath, dirname, filename);
    console.log(target);

    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      this.error(err);
    }

    let video = await ctx.model.Videolist.create({
        filePath: "http://192.168.8.119:8000/" + path.join(target.slice(4)),
        fileName: filename,
        title: '视频'
    });
    this.success(video);
  }
}

module.exports = UpdataController;