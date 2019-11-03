import React from 'react';

import { Icon } from 'antd';

import './styles.css';

const AppCard = ({ ...props }) => (
    <div className={`card card-${props.styleCard}`}>
        <h2>
            {props.title}
        </h2>
        <h1>
            <Icon type={props.icon} spin={false}/> 
            {props.value}
        </h1>
    </div>
);

export default AppCard;