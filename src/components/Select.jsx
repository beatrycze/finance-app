import React from 'react';

const Select = (props) => {
    const options = props.options.map((option) => {
        if(option.name) {
            return <option key={option.id}>{option.name}</option>
        } else if (option.firstName) {
            return <option key={option.id}>{`${option.firstName} ${option.lastName}`}</option>
        }
        return null;
    });    

    return (
        <div>
            <label htmlFor={props.label} className="col-sm-2 col-lg-1 col-form-label">{props.name}</label>
            <div className="col-sm-6 col-md-4">
                <select className="form-control" id={props.label}>
                    <option value={props.selectValue}>{props.selectValue ? props.selectValue : "Wybierz"}</option>
                    {options}
                </select>
            </div>
        </div>
    );
}

export default Select;
