import Layout from "../views/Layout";
import Login from "../views/Login";
import ArticleCategory from "../views/article/category"
import ArticleManage from "../views/article/manager"
import UserAvatar from "../views/user/avatar"
import UserInfo from "../views/user/info"
import UserResetPassword from "../views/user/resetPassword"
import { RouteConfig } from "react-router-config";

const router: RouteConfig = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/article/category',
                element: <ArticleCategory />
            },
            {
                path: '/article/manage',
                element: <ArticleManage></ArticleManage>
            },
            {
                path: '/user/avatar',
                element: <UserAvatar></UserAvatar>
            },
            {
                path: '/user/info',
                element: <UserInfo />
            },
            {
                path: '/user/resetPassword',
                element: <UserResetPassword></UserResetPassword>
            }
        ],
        redirect: '/article/category'
    },
    {
        path: '/login',
        element: <Login />
    }
]

export default router;