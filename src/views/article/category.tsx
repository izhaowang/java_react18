import { Card, Table, Space, Tag, Form, Button, Input, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getArticleCategory, deleatAtricile, editArticleCategory, submitArticleCategory } from "../../api/article"
import { useEffect, useState } from 'react';
interface DataType {
    id?: number,
    categoryName?: string;
    categoryAlias?: string;
    createTime?: number;
    createUser?: number;
    key?: string,
}

type ValidateRule = {
    required?: true,
    message: string,
    max?: number,
    min?: number,
}
const useV: ValidateRule[] = [
    {
        required: true, message: 'Please input !',
    }

]

const Category: React.FC = () => {
    let [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();
    useEffect(() => {

        const getArticleCategoryApi = async () => {
            console.log("hiww");

            await InitArticleCategory();
        }
        getArticleCategoryApi();

    }, [])
    const [visiable, setVisiable] = useState(false);
    const [editData, setEditData] = useState<DataType>({});
    const InitArticleCategory = async () => {
        let res = await getArticleCategory();
        console.log(res);
        dataSource = res.data.map((item: DataType, index: number) => {
            item.key = index + "1"
            return item;
        })
        console.log(dataSource);
        setDataSource(dataSource);
    }

    const [delVisiable, setdelVisiable] = useState(false);
    const handleDel = async () => {
        await deleatAtricile({ id: editData.id });
        await InitArticleCategory()
        setdelVisiable(false);
    }
    const handleCancelDel = () => {
        setdelVisiable(false)
    }
    const [title, setTitle] = useState("Edit");
    const handleOk = async () => {
        console.log(editData);

        console.log(form);
        let data = form && form.getFieldsValue();
        if (title === "Edit") {
            data = {
                ...data, ...{ id: editData.id }
            }
            await editArticleCategory(data);
        } else {
            await submitArticleCategory(data)
        }

        await InitArticleCategory()
        setVisiable(false);
    }
    const handleCancel = () => {
        setVisiable(false);
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Index',
            dataIndex: 'key',

        },
        {
            title: 'article category',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'article alias',
            dataIndex: 'categoryAlias',
            key: 'categoryAlias',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: DataType) => (
                < Space size="middle" style={{ cursor: "pointer" }}>
                    <Tag onClick={() => {
                        setTitle("Edit")
                        setEditData(record);
                        form.setFieldsValue(record)
                        setVisiable(true);

                    }}>Edit </Tag>
                    <Tag onClick={() => {

                        setEditData(record);
                        setdelVisiable(true)
                    }}>Delete</Tag>
                </Space >

            ),
        }
    ];

    const validateMessages = {
        required: "'${name}' 是必选字段",
        // ...
    };
    return (
        <Card title="acticle category"
            extra={<Button type="primary" onClick={() => {
                setTitle("Add")
                setEditData({});
                form.setFieldsValue({})
                console.log(editData);

                setVisiable(true);

            }}>Add Category</Button>}
            bordered={false} className={"categoryCard"} style={{
                height: "100%"
            }}>
            <Table dataSource={dataSource} columns={columns} pagination={false} />;
            <Modal title={title} open={visiable} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    validateMessages={validateMessages}
                    form={form}
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 18, }}
                    style={{ maxWidth: 600 }}
                    initialValues={editData}

                    autoComplete="off"
                >
                    <Form.Item
                        label="categoryName"
                        name="categoryName"
                        rules={useV}
                        validateTrigger="onBlur"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="categoryAlias"
                        name="categoryAlias"
                        rules={useV}
                        validateTrigger="onBlur"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Please Confirm" open={delVisiable} onOk={handleDel} onCancel={handleCancelDel} >
                <p> Are you sure Delete?</p>
            </Modal>
        </Card >

    )
};
export default Category;