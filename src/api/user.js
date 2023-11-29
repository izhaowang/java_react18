import request from "../utils/request"
//

const userRegister = data => {
    console.log(data);
    const params = new URLSearchParams();
    for (let key in data) {
        params.append(key, data[key])
    }
    console.log(params);
    return request.post('/user/register', params)
};
const userLogin = data => {
    console.log(data);
    const params = new URLSearchParams();
    for (let key in data) {
        params.append(key, data[key])
    }
    console.log(params);
    return request.post('/user/login', params)
}
const userInfo = () => {
    return request.get('/user/userInfo')
}
const editUserInfo = (data) => {
    return request.put("/user/update", data)
}
const updataAvatarServer = (data) => { // queryString
    const params = new URLSearchParams();
    params.append("avatarUrl", data)
    return request.patch("/user/updateAvatar", params)
}
const updatePwdServer = (data) => {
    return request.patch("/user/updatePwd", data)
}
export { userRegister, userLogin, userInfo, editUserInfo, updataAvatarServer, updatePwdServer };