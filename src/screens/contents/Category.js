import React, { useState, useEffect } from 'react';

import Moment from 'react-moment';

import Api from './../../services/api';

import { Input, message, Table, Modal, Button, Row, Icon, Form, Select, Popconfirm } from 'antd';


function Category() {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Criado',
            dataIndex: 'created_at',
            key: 'created_at',
            render: created_at => (
                <Moment format="DD/MM/YYYY hh:mm:ss">
                    {created_at}
                </Moment>
            )
        },
        {
            title: 'Ações',
            dataIndex: 'key',
            render: key => (
                <>
                    <Button type='primary' style={{ marginRight: '5px' }} onClick={() => handleEdit(key)}>Editar</Button>
                    <Popconfirm onConfirm={() => handleDelete(key)} okText='Sim' cancelText='Não' title="Quer mesmo deletar?">
                        <Button type='danger' >Deletar</Button>
                    </Popconfirm>
                </>
            )
        },
    ];

    const [loadingData, setLoadingData] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formSub, setFormSub] = useState({
        id: 0,
        name: ''
    })

    const [modalCategorySub, setModalCategorySub] = useState({
        visible: false,
        confirmLoading: false
    });

    const [modalCategoryEdit, setModalCategoryEdit] = useState({
        visible: false,
        id: 0
    });

    const showModal = (modal, id = 0) => {
        if (modal === 'edit') {
            setModalCategoryEdit({
                visible: true,
                id
            });
        } else if (modal === 'sub') {
            setModalCategorySub({
                visible: true,
            });
        }
    };

    const handleCancel = (modal) => {
        if (modal === 'edit') {
            setModalCategoryEdit({
                visible: false,
                id: 0
            });
        } else if (modal === 'sub') {
            setModalCategorySub({
                visible: false,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await Api.post('/category', formSub);
            setModalCategorySub({
                visible: false,
            });
            loadingCategories();
            setFormSub({ name: '' })
        } catch (error) {
            setModalCategorySub({
                visible: false,
            });
            console.log(error.response)
        }

    };

    const handleEditChange = (e) => {
        setFormSub({
            ...formSub,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = async (id) => {
        const category = await Api.get('/category/' + id);

        setFormSub({
            id: category.data.id,
            name: category.data.name,
        });

        showModal('edit')
    };

    const handleEditSave = async (e) => {
        e.preventDefault()
        try {
            await Api.put('/category/' + formSub.id, formSub);
            setModalCategoryEdit({
                visible: false,
            });
            loadingCategories();
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await Api.delete('/category/' + id);
            message.success('O produto ' + response.data.name + ' foi deletado com sucesso')
            setCategories({
                ...categories,
                data: categories.data.filter(category => category.id !== id)
            });
        } catch (error) {
            message.error('Erro na hora de deletar o produto', 2.5)
        }
    }

    const loadingCategories = async (page = 1) => {
        setLoadingData(true);

        try {
            const response = await Api.get('/category');
            const data = response.data;
            console.log('aqui', data)
            var data_fianl = data.map((category) => {
                category.key = category.id;
                return category;
            });
            setCategories({
                total: 20,
                data: data_fianl
            });
        } catch (error) {
            console.log(error.response)
            alert('Não foi possível buscar as categorias')
        }
        setLoadingData(false);
    }

    useEffect(() => {
        loadingCategories()
    }, []);

    return (
        <>
            <Row>
                <Button style={{ marginRight: '5px' }} type="primary" onClick={() => showModal('sub')}><Icon type="plus" /> Categoria</Button>
            </Row>
            <br />
            <Modal
                title="Cadastro de categoria"
                visible={modalCategorySub.visible}
                onCancel={() => handleCancel('sub')}
                confirmLoading={modalCategorySub.confirmLoading}
                footer={[
                    <Button onClick={() => handleCancel('sub')} type='danger' key="a">Cancelar <Icon type="close" /></Button>,
                    <Button form="formCategoryCreate" htmlType="submit" type="primary">Cadastrar <Icon type="check" /></Button>,
                ]}
            >
                <Form id="formCategoryCreate" onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <Input onChange={handleEditChange} value={formSub.name} required name='name' placeholder="Nome da categoria" />
                    </div>
                </Form>
            </Modal>
            <Modal
                title={`Editar ${formSub.name}`}
                visible={modalCategoryEdit.visible}
                onCancel={() => handleCancel('edit')}
                confirmLoading={modalCategoryEdit.confirmLoading}
                footer={[
                    <Button onClick={() => handleCancel('edit')} type='danger' key="a">Cancelar <Icon type="close" /></Button>,
                    <Button form="formCatefory" htmlType="submit" type="primary">Salvar <Icon type="check" /></Button>,
                ]}
            >
                <Form id="formCatefory" onSubmit={handleEditSave}>
                    <div style={{ marginBottom: 16 }}>
                        <Input onChange={handleEditChange} value={formSub.name} required name='name' placeholder="Nome da categoria" />
                    </div>
                </Form>
            </Modal>

            <Table
                style={{ background: '#fff' }}
                columns={columns}
                bordered
                pagination={
                    {
                        onChange: loadingCategories,
                        defaultPageSize: 20,
                        defaultCurrent: categories.page,
                        total: (categories.total * 1)
                    }
                }
                loading={loadingData}
                dataSource={categories.data}
            />
        </>
    );
}

export default Category;