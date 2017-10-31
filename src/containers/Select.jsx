import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.selectedValue,
            options: props.options,
            disabled: props.disabled
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.value !== nextProps.selectedValue) {
            this.setState({
                value: nextProps.selectedValue,
                disabled: !this.state.disabled
            });
        }
    }

    render() {
        const options = this.state.options.map((option) => {
            return <option key={option.id} value={option.id}>{option.name}</option>
        });

        if(this.props.placeholder) {
            options.unshift(<option key="0" disabled={this.state.disabled}>{this.props.placeholder}</option>);
        }

        return (
            <div>
                <label htmlFor={this.props.label} className="col-sm-2 col-lg-1 col-form-label">{this.props.labelDisplay}</label>
                <div className="col-sm-6 col-md-4">
                    <div className={this.props.markError ? this.props.markError(this.props.touched, this.props.valid) : ''}>
                        <select
                            className="form-control"
                            name={this.props.name}
                            id={this.props.label}
                            value={this.state.value}
                            onChange={this.props.handleChange}
                            onBlur={this.props.handleBlur}
                        >
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
    labelDisplay: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    selectedValue: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func,
    markError: PropTypes.func
};

export default Select;
