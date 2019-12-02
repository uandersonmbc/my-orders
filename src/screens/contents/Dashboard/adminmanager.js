import React, { useState, useEffect } from 'react';

import Moment from 'react-moment';

import Api from './../../../services/api';

import connection from './../../../services/socket';

import { Row, Col, Table, Modal, Button, Icon, Avatar } from 'antd';

import AppCard from './../../../components/AppCard';


function Adminmanager() {

    const columns = [
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                let cor = (status === 0) ? '#87d068' : '#f56a00'
                let icon = (status === 0) ? 'check' : 'close'
                return (<Avatar style={{ backgroundColor: cor }} icon={icon} />)
            }
        },
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
        {
            title: 'Ações',
            dataIndex: 'id',
            render: id => (
                <>
                    <Button type='primary' style={{ marginRight: '5px' }} onClick={() => handleItems(id)}>Ver Itens</Button>
                </>
            )
        },
    ];

    const [modalItems, setModalItems] = useState({
        visible: false,
        confirmLoading: false
    });
    const [loadingData, setLoadingData] = useState(false);
    const [infoCard, setInforCard] = useState({
        orders: 0,
        product: 0,
        categories: 0,
        ingredients: 0
    });
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState({
        data: [],
        page: 1,
        total: 0
    });

    const [total, setTotal] = useState(0);

    const loadingOrders = async (page = 1) => {
        setLoadingData(true);
        try {
            const response = await Api.get('/orders?page=' + page);
            setOrders(response.data);
        } catch (error) {
            console.log(error.response)
        }
        setLoadingData(false);
    }

    const loadingUsers = async (page = 1) => {
        try {
            const response = await Api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.log(error.response)
        }
    }

    const loadingInfo = async (page = 1) => {
        try {
            const response = await Api.get('/info');
            setInforCard(response.data);
        } catch (error) {
            console.log(error.response)
        }
    }

    const registerSocket = () => {
        connection.connect();
        connection.subscribe(`order`, realTime);
    }

    const showModal = (modal, id = 0) => {
        setModalItems({
            visible: true,
            id
        });

    };

    const handleItems = async (id) => {

        setTotal(0)

        try {
            const items = await Api.get('/order/' + id);
            setItems(items.data);
            let soma = items.data.map(item => parseFloat(item.price))
            let total = soma.reduce((total, valor) => total + valor, 0);
            setTotal(total)
            showModal('edit')
        } catch (error) {
            console.log(error)
        }
    };

    const handleCancel = (modal) => {
        setModalItems({
            visible: false,
            id: 0
        });

    };
    const realTime = () => {
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
            <Modal
                title="Cadastro de categoria"
                visible={modalItems.visible}
                onCancel={() => handleCancel('sub')}
                confirmLoading={modalItems.confirmLoading}
                footer={[
                    <Button onClick={() => handleCancel('sub')} type='danger' key="a">Fechar <Icon type="close" /></Button>,
                ]}
            >
                <table style={{ width: '100%' }}>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Data</th>
                    </tr>
                    {items.map(item => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>R$ {item.price}</td>
                                <td>
                                    <Moment format="DD/MM/YYYY hh:mm:ss">
                                        {item.created_at}
                                    </Moment>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Total</td>
                        <td>R$ {total}</td>
                        <td></td>
                    </tr>
                </table>
            </Modal>
        </div >
    );
}

export default Adminmanager;