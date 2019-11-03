import React from 'react';

import { Row, Col, Card } from 'antd';

import AppCard from './../../components/AppCard';


import { Bar, Pie } from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const data2 = {
    labels: [
        'Red',
        'Blue',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

export default function Dashboard() {
    // https://www.chartjs.org/docs/latest/

    return (
        <div>
            <Row gutter={[24, 24]} style={{ textAlign: 'center' }}>
                <Col xs={24} lg={6}>
                    <AppCard
                        icon={'shopping-cart'}
                        title={'Pedidos'}
                        value={5}
                        styleCard={2}
                    />
                </Col>
                <Col xs={24} lg={6}>
                    <AppCard
                        icon={'check'}
                        title={'Concluídos'}
                        value={47}
                        styleCard={1}
                    />
                </Col>
                <Col xs={24} lg={6}>
                    <AppCard
                        icon={'close'}
                        title={'Cancelados'}
                        value={3}
                        styleCard={3}
                    />
                </Col>
                <Col xs={24} lg={6}>
                    <AppCard
                        icon={'dollar'}
                        title={'Valor apurado'}
                        value={'123,00'}
                        styleCard={4}
                    />
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card>
                        <Bar
                            data={data}
                            width={100}
                            height={50}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card>
                        <Pie data={data2} width={100} height={50} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}