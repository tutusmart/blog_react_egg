'use strict';
const Controller = require('egg').Controller

class BaseController extends Controller{
    get user(){
        return this.ctx.session.user;
    }
    async getPager({modelName='',fields=[],populateFields=[]}){
        const {ctx} = this;
        let {pageNum=1,pageSize = 5,keyword = ''} = ctx.query;
        pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
        pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);
        let query = {};
        if(keyword && fields.length>0){
            query['$or'] = fields.map(field => ({ [fields] : new RegExp(keyword)}))
        }
        //Skip():使用skip()方法来跳过指定数量的数据,数字参数作为跳过的记录条数
        //limit():指定从MongoDB中读取的记录条数
        //populate把他从id变为对象使用,category存放的是分类的id;
        let total = await ctx.model[modelName].count(query);
        let cursor = ctx.model[modelName].find(query).sort({_id:-1}).skip((pageNum - 1)*pageSize).limit(pageSize)
        if(populateFields.length>0){
            populateFields.forEach(field=>{
                cursor = cursor.populate(field);
            })
        }
        let items = await cursor;
        return {items,total,pageNum,pageSize,pageCount:Math.ceil(total/pageSize)};
    }

    async pagesList(sql1,sql2){
        const {ctx} = this;
        let {pageSize = 10, current = 1} = ctx.query;
        const resList = await this.app.mysql.query(sql1);
        const coutnums = await this.app.mysql.query(sql2);
        
        return {
            total:coutnums[0].total,
            pageSize:pageSize*1,
            current:current*1,
            page:Math.ceil( coutnums[0].total / pageSize*1 ),
            list:resList
        }
    }
    success(data){
        let {ctx} = this;
        ctx.body = {   
            code:1,
            data
        }
    }
    error(error){
        let {ctx} = this;
        ctx.body = {
            code:0,
            error
        }
    }
}
module.exports = BaseController;