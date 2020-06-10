'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('../base');
class HomeController extends BaseController {

  async index() {
    this.ctx.body = 'api hi';
  }

  async getArticleList() {
      let pageSize = this.ctx.query.pageSize || 10;
      let current = this.ctx.query.current || 1;
      console.log(pageSize,current);
    
      let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'ORDER BY article.id DESC ' + 
              'LIMIT ' + pageSize * (current * 1 - 1) + ',' + pageSize;
        let sqlcout = 'SELECT COUNT(article.id) as total FROM article';
        try{
          let items = await this.pagesList(sql,sqlcout)
          this.success(items);
        }catch(error){
          this.error(error);
        }
  }

  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    // console.log(result[0].RowDataPacket.view_count * 1 + 1);/
    let row = {
      id : result[0].id,
      view_count:result[0].view_count*1 + 1
    }
    await this.app.mysql.update('article', row); 
    this.ctx.body = { data: result };
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  // 根据类别ID获得文章列表
  async getListById() {
    let pageSize = this.ctx.query.pageSize || 10;
    let current = this.ctx.query.current || 1;
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id +
      ' LIMIT ' + pageSize * (current * 1 - 1) + ',' + pageSize;
    let sqlcout = 'SELECT COUNT(article.id) as total FROM article WHERE type_id=' + id ;
    try{
      let items = await this.pagesList(sql,sqlcout)
      this.success(items);
    }catch(error){
      this.error(error);
    }
    // const coutnums = await this.app.mysql.query(sqlcout);
    // const result = await this.app.mysql.query(sql);
    // this.ctx.body = {
    //   total:coutnums[0].total,
    //   pageSize:pageSize*1,
    //   current:current*1,
    //   page:Math.ceil( coutnums[0].total / pageSize*1 ),
    //   list:result
    // }
  }
}

module.exports = HomeController
;
