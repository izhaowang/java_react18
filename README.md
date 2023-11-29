# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```node
-- 创建数据库big_EVENT

create database if not exists big_event;

use big_event;

-- 用户表

create table user (
	id int unsigned primary key auto_increment comment 'ID',
	username varchar(20) not null unique comment '用户名',
	password varchar(32) comment '密码',
	nickname varchar(10) default '' comment '昵称',
	email varchar(128) default '' comment '邮箱',
	user_pic varchar(128) default '' comment '头像',
	create_time datetime not null comment '创建时间',
	update_time datetime not null comment '更新时间'



) comment '用户表'

-- 分类表
create table category (
	id int unsigned primary key auto_increment comment 'ID',
	category_name varchar(20) not null unique comment '分类名称',
	category_alias varchar(32) comment '分类别名',
	create_user int unsigned not null comment '创建人ID',
	create_time datetime not null comment '创建时间',
	update_time datetime not null comment '更新时间',
	constraint fk_category_user foreign key (create_user) references user(id) -- 外键约束
)


-- 文章表
create table article(
                        id int unsigned primary key auto_increment comment 'ID',
                        title varchar(30) not null comment '文章标题',
                        content varchar(10000) not null comment '文章内容',
                        cover_img varchar(128) not null  comment '文章封面',
                        state varchar(3) default '草稿' comment '文章状态: 只能是[已发布] 或者 [草稿]',
                        category_id int unsigned comment '文章分类ID',
                        create_user int unsigned not null comment '创建人ID',
                        create_time datetime not null comment '创建时间',
                        update_time datetime not null comment '修改时间',
                        constraint fk_article_category foreign key (category_id) references category(id),-- 外键约束
                        constraint fk_article_user foreign key (create_user) references user(id) -- 外键约束
)
```