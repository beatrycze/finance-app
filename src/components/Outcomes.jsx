import React from 'react';
import TableHead from './TableHead';

const outcomes = () => {
    return(
        <div className="container-fluid page-intro">
            <div className="top-spacer">
                <h1>Lista wydatków</h1>
                <button type="button" className="btn btn-info">Dodaj nowy</button>
                <div className="table-responsive top-spacer">
                    <table className="table table-striped table-condensed">
                        <TableHead />
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Jedzenie</td>
                                <td>45.00</td>
                                <td>John Lenon</td>
                                <td>01-09-2017</td>
                                <td><a href="#">Edytuj</a> | <a href="#">Skasuj</a></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Rachunki</td>
                                <td>679.80</td>
                                <td>Jack Nicholson</td>
                                <td>02-09-2017</td>
                                <td><a href="#">Edytuj</a> | <a href="#">Skasuj</a></td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Podróże</td>
                                <td>1200.00</td>
                                <td>Janis Joplin</td>
                                <td>03-09-2017</td>
                                <td><a href="#">Edytuj</a> | <a href="#">Skasuj</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default outcomes;
