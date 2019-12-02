import React, { useState, useEffect } from 'react';

import { Card, Icon, Row, Col, PageHeader, Button, Descriptions, Popconfirm } from 'antd';

import Api from './../../../services/api';
import { logout } from './../../../services/auth';

import './styles.css';

const { Meta } = Card;

function Customer(props) {

    const [products, setProducts] = useState([]);

    const [myorder, setMyorder] = useState({

    });

    const [productsSelected, setProductsSelected] = useState({
        selected: [],
        total: 0.0
    });

    const addItem = (id) => {
        let selecteds = productsSelected.selected;
        if (selecteds.indexOf(id) === -1) {
            selecteds.push(id);
        }

        setProductsSelected({
            ...productsSelected,
            selected: selecteds
        })

        try {
            const response = Api.post('/addItem', { items: selecteds });
            loadingMyorder()
        } catch (error) {
            console.log(error)
        }
    }

    const removeItem = (id) => {
        let selecteds = productsSelected.selected;
        selecteds = selecteds.filter(sele => sele !== id)
        setProductsSelected({
            ...productsSelected,
            selected: selecteds
        })
        try {
            const response = Api.post('/deleteItem', { items: [id] });
            loadingMyorder()

        } catch (error) {
            console.log(error)
        }
    }


    const openOrder = async () => {
        try {
            const response = Api.post('/order');
            alert('Pedido aberto');
        } catch (error) {
            console.log(error)
        }
    }

    const cancelOrder = () => {
        try {
            const response = Api.put('/myorder');
            alert('Pedido cancelado');
            setProductsSelected({
                total: 0.0,
                selected: []
            })
        } catch (error) {
            console.log(error)
        }
    }

    const loadingProducts = async () => {
        try {
            const response = await Api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.log(error.response)
        }
    }

    const loadingMyorder = async () => {
        try {
            const response = await Api.get('/myorder');
            let items = response.data.items;
            if (items !== undefined) {
                console.log(items)
                let selecteds = items.map(item => {
                    return item.id
                })
                let soma = items.map(item => {
                    return parseFloat(item.price)
                })
                let total = soma.reduce((total, valor) => total + valor, 0);
                setProductsSelected({
                    total: total,
                    selected: selecteds
                })
                setMyorder(response.data);
            }

        } catch (error) {
            console.log(error.response)
        }
    }

    const deslogar = () => {
        logout();
        props.history.push('/login');
    }

    useEffect(() => {
        loadingMyorder()
        loadingProducts()
    }, []);

    return (
        <>

            <PageHeader
                ghost={false}
                title="Pedidos"
                subTitle=""
                extra={[
                    <Popconfirm onConfirm={() => cancelOrder()} okText='Sim' cancelText='Não' title="Quer mesmo cancelar?">
                        <Button key="1" type="danger">Cancelar</Button>
                    </Popconfirm>,
                    <Button key="2" type="primary" onClick={openOrder}>Fazer Pedido</Button>,
                    <Button key="3" type="ghost" onClick={deslogar}>Sair</Button>,
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Valor total">R$ {productsSelected.total}</Descriptions.Item>
                    <Descriptions.Item label="Quantidade">{productsSelected.selected.length}</Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <br />

            <Row gutter={[24, 24]} style={{ textAlign: 'center' }}>
                {products.map(pro => {
                    return (
                        <Col xs={24} lg={6}>
                            < Card
                                style={{ width: '100%', background: (productsSelected.selected.indexOf(pro.id) > -1) ? 'bisque' : '' }}
                                actions={[
                                    <Icon type="plus" key="plus" onClick={() => addItem(pro.id)} />,
                                    <Icon type="close" key="close" onClick={() => removeItem(pro.id)} />
                                ]}
                            >
                                <Meta
                                    title={pro.name}
                                    description={`R$ ${pro.price}`}
                                />
                            </Card >
                        </Col>
                    )
                })}
            </Row>
        </>
    );
}

export default Customer;