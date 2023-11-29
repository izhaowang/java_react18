
import { Menu, Space, Layout } from 'antd';
import {
    DiffOutlined,
    CopyOutlined,
    UserAddOutlined,
    SettingOutlined

} from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
import type { MenuProps } from 'antd';
import { Outlet } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Article Category', '/article/category', <CopyOutlined />),
    getItem('Article Manage', '/article/manage', <DiffOutlined />),

    getItem('User Manage', 'sub1', <UserAddOutlined />, [
        getItem('User Avatar', '/user/avatar'),
        getItem('User info', '/user/info'),
        getItem('Reset password', '/user/resetPassword', <SettingOutlined />),
    ]),
];
const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
};
const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
};
const siderStyle: React.CSSProperties = {
    minWidth: 256,
    width: 256,
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',

};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};
const LayoutStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: '100%',
    height: "100%"
}

const LayoutView: React.FC = () => {
    const naviagte = useNavigate(); // 拿到naviagte
    const clickMenu = (props: MenuItem) => {
        console.log(props);
        naviagte(props && props?.keyPath[0])
    }
    useEffect(() => {
        naviagte('/article/category')
    }, [])
    return (
        <Layout style={Object.assign({ ...LayoutStyle }, { width: '100%' })} >
            <Menu
                mode='inline'
                defaultSelectedKeys={['/article/category']}
                style={{ width: 256, height: "100%", minWidth: 256 }}
                items={items}
                onClick={({ item, key, keyPath, domEvent }) => {
                    clickMenu({ item, key, keyPath, domEvent })
                }}
            />
            <Layout>
                <Header style={headerStyle}>Header</Header>
                <Content style={{
                    ...contentStyle,
                }}>
                    <Outlet />
                </Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </Layout >
    )
}
export default LayoutView;