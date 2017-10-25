import React from 'react';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.selectedValue}
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const options = this.props.options.map((option) => {
            return <option key={option.id} value={option.id}>{option.name}</option>
        });

        if(this.props.placeholder) {
            options.unshift(<option key="0">{this.props.placeholder}</option>);
        }

        return (
            <div>
                <label htmlFor={this.props.label} className="col-sm-2 col-lg-1 col-form-label">{this.props.name}</label>
                <div className="col-sm-6 col-md-4">
                    <select className="form-control" id={this.props.label} value={this.state.value} onChange={this.handleChange.bind(this)}>
                        {options}
                    </select>
                </div>
            </div>
        );
    }
}

export default Select;
