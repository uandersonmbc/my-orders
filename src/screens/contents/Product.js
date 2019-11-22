import React, { useEffect, useState } from 'react';

import Moment from 'react-moment';

import Api from './../../services/api';

import { message, Table, Modal, Button, Row, Icon, Form, Select, Popconfirm } from 'antd';

const { Option } = Select;

function Product(props) {
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
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
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

    const [products, setProducts] = useState({
        data: [],
        total: 0
    });

    const [ingredients, setIngredients] = useState([]);
    const [formSub, setFormSub] = useState()

    const [loadingData, setLoadingData] = useState(false);

    const [modalProduct, setmodalProduct] = useState({
        visible: false,
        confirmLoading: false
    });

    const showModal = () => {
        setmodalProduct({
            visible: true,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.teste)
    };

    const handleEdit = async (id) => {
        const product = await Api.get('/product/' + id);
        setFormSub({
            name: product.data.name,
            price: product.data.price,
            category_id: product.data.category_id,
            ingredients: product.data.ingredients,
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await Api.delete('/product/' + id);
            message.success('O produto ' + response.data.name + ' foi deletado com sucesso')
            setProducts({
                ...products,
                data: products.data.filter(product => product.id !== id)
            });
        } catch (error) {
            message.error('Erro na hora de deletar o produto', 2.5)
        }
    }


    const handleCancel = e => {
        setmodalProduct({
            visible: false,
        });
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const loadingProducts = async (page = 1) => {
        setLoadingData(true);

        try {
            const response = await Api.get('/product?page=' + page);
            const data = response.data.data;
            var data_fianl = data.map((product) => {
                product.key = product.id;
                return product;
            });
            setProducts({
                total: response.data.total,
                data: data_fianl
            });
        } catch (error) {
            alert('Não foi possível buscar os produtos')
        }
        setLoadingData(false);
    }

    const loadingIngredients = async (page = 1) => {
        try {
            const response = await Api.get('/ingredient');

            let data = response.data.map(ingredient => {
                return (<Option value={ingredient.name} key={ingredient.id}>{ingredient.name}</Option>)
            });

            setIngredients(data);
        } catch (error) {
            alert('Não foi possível buscar os ingredientes')
        }
    }


    useEffect(() => {
        loadingProducts()
        loadingIngredients()
    }, []);

    console.log(formSub)

    return (
        <>
            <Row>
                <Button style={{ marginRight: '5px' }} type="primary" onClick={showModal}>
                    <Icon type="plus" />
                    Produto</Button>
            </Row>
            <br />
            <Modal
                title="Basic Modal"
                visible={modalProduct.visible}
                onCancel={handleCancel}
                confirmLoading={modalProduct.confirmLoading}
                footer={[
                    <Button onClick={handleCancel} type='danger' key="a">Cancelar <Icon type="close" /></Button>,
                    <Button form="formProduct" htmlType="submit" type="primary">Cadastrar <Icon type="check" /></Button>,
                ]}
            >
                <Form id="formProduct" onSubmit={handleSubmit}>
                    <Select
                        name='teste'
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={['china']}
                        onChange={handleChange}
                    >
                        {ingredients}
                    </Select>
                </Form>
            </Modal>
            <Table
                style={{ background: '#fff' }}
                columns={columns}
                bordered
                pagination={
                    {
                        onChange: loadingProducts,
                        defaultPageSize: 20,
                        defaultCurrent: products.page,
                        total: (products.total * 1)
                    }
                }
                loading={loadingData}
                dataSource={products.data}
            />
        </>
    );

}

export default Product;