import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.selectedValue,
            handleChange: props.handleChange,
            handleBlur: props.handleBlur,
            disabled: props.disabled
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.value !== nextProps.selectedValue) {
            this.setState({
                value: nextProps.selectedValue,
                disabled: !this.state.disabled
            })
        }
    }

    render() {
        const options = this.props.options.map((option) => {
            return <option key={option.id} value={option.id}>{option.name}</option>
        });

        if(this.props.placeholder) {
            options.unshift(<option key="0" disabled={this.state.disabled}>{this.props.placeholder}</option>);
        }

        return (
            <div>
                <label htmlFor={this.props.label} className="col-sm-2 col-lg-1 col-form-label">{this.props.name}</label>
                <div className="col-sm-6 col-md-4">
                    <div className={this.props.markError ? this.props.markError(this.props.touched, this.props.valid) : ''}>
                        <select className="form-control" id={this.props.label} value={this.state.value} onChange={this.state.handleChange} onBlur={this.state.handleBlur}>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    selectedValue: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    handleBlur: PropTypes.func,
    markError: PropTypes.func
};

export default Select;
