let ipUrl = 'http://106.54.141.244:7001/admin/';

if (process.env.NODE_ENV === 'production') {
    ipUrl = '/apl/admin/'
} else {
    ipUrl = 'http://127.0.0.1:7001/admin/'
}

let servicePath = {
    checkLogin:ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
    addArticle:ipUrl + 'addArticle' ,  //  添加文章
    updateArticle:ipUrl + 'updateArticle' ,  //  修改文章第api地址
    getTypeInfo:ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
    getArticleList:ipUrl + 'getArticleList' ,  //  文章列表
    delArticle:ipUrl + 'delArticle/' ,  //  删除文章
    getArticleById:ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
    addType : ipUrl + 'addType', //添加类别
    updateFile: ipUrl + 'updateFile'
}

export default servicePath;
