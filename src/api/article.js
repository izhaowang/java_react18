import request from "../utils/request.js";
const getArticleCategory = () => {
    return request.get('/category')
};
const submitArticleCategory = data => {
    console.log(data);
    return request.post('/category/add', data)
}
const editArticleCategory = data => {
    return request.put('/category', data)
}
const deleatAtricile = data => {
    console.log(data);
    return request.delete('/category', { params: data })
}
const getArticle = data => {
    return request.get('/article', {
        params: data
    })
}
const addArticle = data => {
    return request.post('/article', data)
}
export {
    getArticleCategory,
    submitArticleCategory,
    // 
    editArticleCategory,
    // querystring类型
    deleatAtricile,
    // 获取文章列表
    getArticle,

    // 新增文章
    addArticle

}