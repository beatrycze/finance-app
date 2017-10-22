import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div className="container-fluid">
            <div className="row top-spacer">
                <div className="col-sm-6 col-md-offset-2 col-md-4 col-md-offset-2 col-lg-4">
                    <div className="jumbotron text-center">
                        <p className="text-uppercase">
                            <Link to={'/outcomes'}>Wydatki</Link>
                        </p>
                        <p>
                            <Link to={'/add-outcome'} className="btn btn-info btn-lg" role="button">Dodaj nowy</Link>
                        </p>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                    <div className="jumbotron text-center">
                        <p className="text-uppercase">
                            <Link to={'/incomes'}>Przychody</Link>
                        </p>
                        <p>
                            <Link to={'/add-income'} className="btn btn-info btn-lg" href="#" role="button">Dodaj nowy</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
