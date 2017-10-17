import React from 'react';
import Select from './Select';
import '../styles/AddOutcome.css';

const AddOutcome = (props) => {
    const outcomeCategoriesOptions = props.outcomeCategories.map(category => category.name);
    const userNames = props.users.map(user => `${user.firstName} ${user.lastName}`);

    return(
        <div className="container-fluid page-intro">
            <div className="panel panel-default top-spacer">
                <div className="panel-heading">
                    <h1>Dodaj wydatek</h1>
                </div>
                <div className="panel-body">
                    <form className="top-top-spacer">
                        <div className="form-group row hidden">
                            <label htmlFor="outcomeId" className="col-sm-2 col-lg-1 col-form-label">Id</label>
                            <div className="col-sm-3 col-md-2">
                                <input type="text" className="form-control" id="outcomeId" placeholder="" value={props.id} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="amount" className="col-sm-2 col-lg-1 col-form-label">Kwota</label>
                            <div className="col-sm-3 col-md-2">
                                <input type="text" className="form-control" id="amount" placeholder="Wpisz kwotę" value={props.amount} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <Select 
                                label={"category"}
                                name={"Kategoria"}
                                value={props.newOutcome.categoryId}
                                options={outcomeCategoriesOptions}
                            />
                        </div>
                        <div className="form-group row">
                            <Select 
                                label={"createdBy"}
                                name={"Utworzył(a)"}
                                value={props.newOutcome.createdBy}
                                options={userNames}
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="date" className="col-sm-2 col-lg-1 col-form-label">Data</label>
                            <div className="col-sm-3 col-md-2">
                                <input type="text" className="form-control" id="date" placeholder="Wpisz datę" value={props.createdAt}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="checkbox col-sm-3 col-sm-offset-2 col-lg-offset-1">
                                <label>
                                <input type="checkbox" /> Zapamiętaj datę
                                </label>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="description" className="col-sm-2 col-lg-1 col-form-label">Opis</label>
                            <div className="col-sm-6 col-md-4">
                                <input type="text" className="form-control" id="description" placeholder="Dodaj opis" value={props.description}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-1 col-sm-offset-2 col-lg-offset-1 top-spacer right-spacer">
                                <button type="submit" className="btn btn-primary">Zapisz i dodaj</button>
                            </div>
                            <div className="col-sm-1 col-sm-offset-1 col-md-offset-0 col-lg-offset-0 top-spacer right-spacer">
                                <button type="button" className="btn btn-info">Zapisz zmiany</button>
                            </div>
                            <div className="col-sm-1 col-sm-offset-1 col-md-offset-0 col-lg-offset-0 top-spacer">
                                <button type="button" className="btn btn-default">Wróć do listy wydatków</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        // <div className="page-intro grid">
        //     <h1>Dodaj wydatek</h1>

        //     <form>
        //         <div className="row">
        //             <label for="amount" className="col-2">Kwota</label>
        //             <div className="col-10">
        //             <input type="text" className="form-control" id="amount" placeholder="Kwota" />
        //             </div>
        //         </div>
        //         <div className="row">
        //             <label for="category" className="col-2">Kategoria</label>
        //             <div className="col-10">
        //             <select className="" id="category">
        //             <option>Jakaś kategoria ...</option>
        //             <option>Jakaś kategoria ...</option>
        //             <option>Jakaś kategoria ...</option>
        //             <option>Jakaś kategoria ...</option>
        //             <option>Jakaś kategoria ...</option>
        //             </select>
        //             </div>
        //         </div>
        //         <div className="row">
        //             <label for="createdBy" className="col-2">Utworzył(a)</label>
        //             <div className="col-10">
        //             <select className="" id="createdBy">
        //             <option>Jakiś użytkownik ...</option>
        //             <option>Jakiś użytkownik ...</option>
        //             <option>Jakiś użytkownik ...</option>
        //             </select>
        //             </div>
        //         </div>
        //         <div className="row">
        //             <label for="date" className="col-2">Utworzono</label>
        //             <div className="col-10">
        //             <input type="text" className="form-control" id="date" placeholder="Wybierz datę" />
        //             </div>
        //         </div>
        //         <div className="row">
        //             <label for="dateSave" className="col-2">Zapamiętaj datę</label>
        //             <div className="col-10">
        //             <input type="checkbox" className="form-control" id="dateSave" />
        //             </div>
        //         </div>
        //         <div className="row">
        //             <label for="description" className="col-2">Opis</label>
        //             <div className="col-10">
        //             <input type="text" className="form-control" id="description" placeholder="opis" />
        //             </div>
        //         </div>
        //         <button type="submit" class="">Zapisz i dodaj</button>
        //     </form>
        // </div>
    );
}

export default AddOutcome;
