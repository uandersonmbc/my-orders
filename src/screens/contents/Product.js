import React, { useEffect, useState } from 'react';

import Moment from 'react-moment';

import Api from './../../services/api';

import { Input, message, Table, Modal, Button, Row, Icon, Form, Select, Popconfirm } from 'antd';

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
    const [selectedIng, setSelectedIng] = useState([]);

    const [categories, setCategories] = useState([]);

    const [formSub, setFormSub] = useState({
    })

    const [loadingData, setLoadingData] = useState(false);

    const [modalProductSub, setModalProductSub] = useState({
        visible: false,
        confirmLoading: false
    });

    const [modalProductEdit, setModalProductEdit] = useState({
        visible: false,
        id: 0
    });

    const showModal = (modal, id = 0) => {
        if (modal === 'edit') {
            setModalProductEdit({
                visible: true,
                id
            });
        } else if (modal === 'sub') {
            setModalProductSub({
                visible: true,
            });
        }
    };

    const handleCancel = (modal) => {
        if (modal === 'edit') {
            setModalProductEdit({
                visible: false,
                id: 0
            });
        } else if (modal === 'sub') {
            setModalProductSub({
                visible: false,
            });
        }
        setSelectedIng([])
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        let data = {
            name: e.target.name.value,
            price: e.target.price.value,
            category_id: e.target.category.value,
            ingredients: selectedIng
        }
        // console.log(data)
        try {
            await Api.post('/product', data);
            setModalProductSub({
                visible: false,
            });
            loadingProducts();
        } catch (error) {
            console.log(error.response)
        }

    };

    function handleChangeIng(value) {
        const res = value.map(va => {
            var { id } = ingredients.ingredients.filter(ing => ing.name === va)[0];
            return id;
        });
        console.log(res)
        setSelectedIng(res);
        setFormSub({
            ...formSub,
            ingredients: res
        })
    }

    const handleEditChange = (e) => {
        setFormSub({
            ...formSub,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = async (id) => {
        const product = await Api.get('/product/' + id);

        const ingredients = product.data.ingredients
        const resid = ingredients.map(ing => {
            return ing.id;
        });
        const resname = ingredients.map(ing => {
            return ing.name;
        });
        console.log(resname)
        alert(resname);
        setFormSub({
            id,
            name: product.data.name,
            price: product.data.price,
            category_id: product.data.category_id,
            ingredients: resid
        });
        setSelectedIng(resname);
        showModal('edit')
    };

    const handleEditSave = async (e) => {
        e.preventDefault()
        try {
            await Api.put('/product/' + formSub.id, formSub);
            setModalProductEdit({
                visible: false,
            });
            loadingProducts();
        } catch (error) {
            console.log('asfa', error)
        }
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

    const loadingIngredients = async () => {
        try {
            const response = await Api.get('/ingredient');

            let data = response.data.map(ingredient => {
                return (<Option key={ingredient.name}>{ingredient.name}</Option>)
            });

            setIngredients({
                ingredients: response.data,
                options: data
            });
        } catch (error) {
            alert('Não foi possível buscar os ingredientes')
        }
    }

    const loadingCategories = async () => {
        try {
            const response = await Api.get('/category');

            let data = response.data.map(category => {
                return (<option value={category.id}>{category.name}</option>)
            });

            setCategories({
                categories: response.data,
                options: data
            });
        } catch (error) {
            alert('Não foi possível buscar os ingredientes')
        }
    }


    useEffect(() => {
        loadingProducts()
        loadingIngredients()
        loadingCategories()
    }, []);

    console.log(selectedIng)

    return (
        <>
            <Row>
                <Button style={{ marginRight: '5px' }} type="primary" onClick={() => showModal('sub')}>
                    <Icon type="plus" />
                    Produto</Button>
            </Row>
            <br />
            <Modal
                title="Basic Modal"
                visible={modalProductSub.visible}
                onCancel={() => handleCancel('sub')}
                confirmLoading={modalProductSub.confirmLoading}
                footer={[
                    <Button onClick={() => handleCancel('sub')} type='danger' key="a">Cancelar <Icon type="close" /></Button>,
                    <Button form="formProduct" htmlType="submit" type="primary">Cadastrar <Icon type="check" /></Button>,
                ]}
            >
                <Form id="formProduct" onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <Input required name='name' placeholder="Nome do produto" />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Input
                            required
                            name='price'
                            prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type='number' step='0.1'
                            placeholder="Valor"
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <select name='category'>
                            {categories.options}
                        </select>
                    </div>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Por favor selecione um ingrediente"
                        onChange={handleChangeIng}

                    >
                        {ingredients.options}
                    </Select>
                </Form>
            </Modal>
            <Modal
                title="Basic Modal"
                visible={modalProductEdit.visible}
                onCancel={() => handleCancel('edit')}
                confirmLoading={modalProductEdit.confirmLoading}
                footer={[
                    <Button onClick={() => handleCancel('edit')} type='danger' key="a">Cancelar <Icon type="close" /></Button>,
                    <Button form="formProducta" htmlType="submit" type="primary">Salvar <Icon type="check" /></Button>,
                ]}
            >
                <Form id="formProducta" onSubmit={handleEditSave}>
                    <div style={{ marginBottom: 16 }}>
                        <Input onChange={handleEditChange} value={formSub.name} required name='name' placeholder="Nome do produto" />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Input
                            onChange={handleEditChange}
                            value={formSub.price}
                            required
                            name='price'
                            prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type='number' step='0.1'
                            placeholder="Valor"
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <select required name='category_id' onChange={handleEditChange}>
                            {categories.options}
                        </select>
                    </div>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Por favor selecione um ingrediente"
                        onChange={handleChangeIng}
                        defaultValue={selectedIng}
                    >
                        {ingredients.options}
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