import React, { useState, useEffect } from 'react';

import Moment from 'react-moment';

import Api from './../../../services/api';

import connection from './../../../services/socket';

import { Row, Col, Table, Popconfirm, Button } from 'antd';

import AppCard from './../../../components/AppCard';


function Adminmanager() {
    let subscription;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Usuário',
            dataIndex: 'user_id',
            key: 'user_id',
            render: user_id => {
                const user = users.filter(user => user.id === user_id)[0]
                return user.name
            }
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
        // {
        //     title: 'Ações',
        //     dataIndex: 'key',
        //     render: key => (
        //         <>
        //             <Button type='primary' style={{ marginRight: '5px' }} onClick={() => alert(key)}>Editar</Button>
        //             <Popconfirm onConfirm={() => alert(key)} okText='Sim' cancelText='Não' title="Quer mesmo deletar?">
        //                 <Button type='danger' >Deletar</Button>
        //             </Popconfirm>
        //         </>
        //     )
        // },
    ];

    const [loadingData, setLoadingData] = useState(false);
    const [infoCard, setInforCard] = useState({
        orders: 0,
        product: 0,
        categories: 0,
        ingredients: 0
    });
    const [users, setUsers] = useState([]);
    const [orders, serOrders] = useState({
        data: [],
        page: 1,
        total: 0
    });

    const loadingOrders = async (page = 1) => {
        setLoadingData(true);
        try {
            const response = await Api.get('/order?page=' + page);
            serOrders(response.data);
        } catch (error) {
            console.log(error.response)
            alert('Não foi possível buscar as categorias')
        }
        setLoadingData(false);
    }

    const loadingUsers = async (page = 1) => {
        try {
            const response = await Api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.log(error.response)
            alert('Não foi possível buscar as categorias')
        }
    }

    const loadingInfo = async (page = 1) => {
        try {
            const response = await Api.get('/info');
            setInforCard(response.data);
        } catch (error) {
            console.log(error.response)
            alert('Não foi possível buscar as informações')
        }
    }

    const registerSocket = () => {
        connection.connect();
        subscription = connection.subscribe(`order`, teste);
    }

    const teste = () => {
        loadingInfo()
        loadingOrders()
    }

    useEffect(() => {
        registerSocket()
        loadingInfo()
        loadingUsers()
        loadingOrders()
    }, []);

    return (
        <div>
            <Row gutter={[24, 24]} style={{ textAlign: 'center' }}>
                <Col xs={24} lg={6}>
                    <AppCard
                        title={'Pedidos'}
                        value={infoCard.orders}
                        styleCard={1}
                    />
                </Col>
                <Col xs={24} lg={6}>
                    <AppCard
                        title={'Produtos'}
                        value={infoCard.product}
                        styleCard={2}
                    />
                </Col>
                <Col xs={24} lg={6}>
                    <AppCard
                        title={'Categorias'}
                        value={infoCard.categories}
                        styleCard={3}
                    />
                </Col>
                <Col xs={24} lg={6}>
                    <AppCard
                        title={'Ingredientes'}
                        value={infoCard.ingredients}
                        styleCard={4}
                    />
                </Col>
            </Row>

            <br />

            <h3>Pedidos</h3>
            <Table
                style={{ background: '#fff' }}
                columns={columns}
                bordered
                pagination={
                    {
                        onChange: loadingOrders,
                        defaultPageSize: 20,
                        defaultCurrent: orders.page,
                        total: (orders.total * 1)
                    }
                }
                loading={loadingData}
                dataSource={orders.data}
            />
        </div>
    );
}

export default Adminmanager;