import React from 'react';

import { Table, Button, Row, Icon } from 'antd';

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        btn: [
            {
                name: 'Deletar',
                icon: 'delete',
                type: 'danger'
            },
            {
                name: 'Deletar',
                icon: 'edit',
                type: 'primary'
            }
        ]
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        btn: [
            {
                name: 'Deletar',
                icon: 'delete',
                type: 'danger'
            },
            {
                name: 'Deletar',
                icon: 'edit',
                type: 'primary'
            }
        ]
    },
];

const columns = [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Ação',
        dataIndex: 'btn',
        key: 'btn',
        render: btns => (
            btns.map((btn) => (
                <Button style={{ marginRight: '5px' }} size='large' type={btn.type}><Icon type={btn.icon} />{btn.name}</Button>
            ))
        ),
    },
];

console.log(process.env.TESTE);


class Category extends React.Component {
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

export default Category;