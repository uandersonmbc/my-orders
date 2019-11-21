import React from 'react';

import './style.css';

export default function AppTable() {
    const teste = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
        <div class="table100 ver1">
            <div class="table100-head">
                <table>
                    <thead>
                        <tr class="row100 head">
                            <th class="cell100 column1">Class name</th>
                            <th class="cell100 column2">Type</th>
                            <th class="cell100 column3">Hours</th>
                            <th class="cell100 column4">Trainer</th>
                            <th class="cell100 column5">Spots</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div class="table100-body">
                <table>
                    <tbody>
                        {teste.map(value => (
                            <tr class="row100 body">
                                <td class="cell100 column1">Like a butterfly</td>
                                <td class="cell100 column2">Boxing</td>
                                <td class="cell100 column3">9:00 AM - 11:00 AM</td>
                                <td class="cell100 column4">Aaron Chapman</td>
                                <td class="cell100 column5">10</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
