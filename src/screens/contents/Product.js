import React, { useEffect, useState } from 'react';

import Api from './../../services/api';

import { Table, Modal, Button, Row, Icon } from 'antd';

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
    },
    {
        title: 'Ações',
        dataIndex: 'action',
        key: 'action',
    },
];

function Product() {
    const [products, setProducts] = useState({
        data: []
    });

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

    const handleOk = e => {
        console.log(e);
        setmodalProduct({
            visible: false,
        });
    };

    const handleCancel = e => {
        console.log(e);
        setmodalProduct({
            visible: false,
        });
    };

    const loadingProducts = async (page = 1) => {
        setLoadingData(true);
        const response = await Api.get('/product?page=' + page);
        setProducts(response.data);
        setLoadingData(false);
    }
    useEffect(() => {
        loadingProducts()
    }, []);

    console.log(products.total * 1);
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
                    <Button onClick={handleOk} key="b" type="primary">Cadastrar <Icon type="check" /></Button>,
                ]}
            >
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
                        total: products.total
                    }
                }
                loading={loadingData}
                dataSource={products.data}
            />
        </>
    );

}

export default Product;