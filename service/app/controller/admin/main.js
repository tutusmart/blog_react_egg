'use strict';
const BaseController = require('../base');

class MainController extends BaseController {
    async index() {
        //特使登陆
        let openId = new Date().getTime()
        this.ctx.session.openId={ 'openId':openId }
        this.ctx.body='hi api'
    }

    // 判断用户名密码是否正确
    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT user_name FROM admin_user WHERE user_name = '" + userName +
            "' AND password = '" + password + "'"

        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            //登录成功,进行session缓存
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId }

        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }

    //后台文章分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType }
    }

    //添加文章
    async addArticle() {
        const tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isScuccess: insertSuccess,
            insertId: insertId
        }
    }

    //修改文章
    async updateArticle() {
        const tmpArticle = this.ctx.request.body
        console.log(tmpArticle);
        
        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        // console.log(updateSuccess)
        this.ctx.body = {
            isScuccess: updateSuccess
        }
    }

    //获得文章列表
    async getArticleList() {
        let pageSize = this.ctx.query.pageSize || 10;
        let current = this.ctx.query.current || 1;
        console.log(pageSize,current);
        // SELECT COUNT(article.id) 
        // FROM article LEFT JOIN type ON article.type_id = type.Id 
        // WHERE 条件
        let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC ' + 
                'LIMIT ' + pageSize * (current*1 - 1) + ',' + pageSize;;
        let sqlcout = 'SELECT COUNT(article.id) as total FROM article';
        try{
            let items = await this.pagesList(sql,sqlcout)
            this.success(items);
        }catch(error){
            this.error(error);
        }
    }

    //添加类别
    async addType() {
        const tmpType = this.ctx.request.body
        const res = await this.app.mysql.insert('type',tmpType);
        this.ctx.body = { data: res }
    }

    //删除文章
    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', { 'id': id })
        this.ctx.body = { data: res }
    }

    //根据文章ID得到文章详情，用于修改文章
    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }
}

module.exports = MainController
