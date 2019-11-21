import React from 'react';

import { Table, Button, Row, Icon } from 'antd';

// const dataSource = [
//     {
//         key: '1',
//         name: 'Cachorro quente',
//         price: 32,
//         category: 'Pão',
//         btn: [
//             {
//                 name: 'Deletar',
//                 icon: 'delete',
//                 type: 'danger'
//             },
//             {
//                 name: 'Deletar',
//                 icon: 'edit',
//                 type: 'primary'
//             }
//         ]
//     },
//     {
//         key: '2',
//         name: 'Cachorro quente',
//         price: 42,
//         category: 'Pão',
//         btn: [
//             {
//                 name: 'Deletar',
//                 icon: 'delete',
//                 type: 'danger'
//             },
//             {
//                 name: 'Deletar',
//                 icon: 'edit',
//                 type: 'primary'
//             }
//         ]
//     },
// ];

const dataSource = []

const columns = [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: 'Ação',
        dataIndex: 'btn',
        key: 'btn',
        render: btns => (
            btns.map((btn) => (
                <Button style={{ marginRight: '5px' }} type={btn.type}><Icon type={btn.icon} />{btn.name}</Button>
            ))
        ),
    },
];

class Product extends React.Component {
    render() {
        return (
            <>
                <Row>
                    <Button type="primary" onClick={this.showModal}>
                        <Icon type="plus" />
                        Produto</Button>
                </Row>
                <br />
                <Table style={{ background: '#FFF' }} dataSource={dataSource} columns={columns} />
            </>
        );
    }
}

export default Product;