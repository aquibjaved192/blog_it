/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

/**
 * This is multi select select option tag input field
 */
class SelectMultiTagsField extends PureComponent {
  render() {
    const {
      placeholder,
      className,
      isMulti,
      optionsList,
      name,
      value,
      onChange,
    } = this.props;

    const { Option } = components;

    const CustomSelectOption = (props) => (
      <Option {...props}>
        {props.data.icon && (
          <span className="input-select__icon m-2">{props.data.icon}</span>
        )}
        <span>{props.data.label}</span>
      </Option>
    );

    return (
      <Select
        id={name}
        instanceId={name}
        value={value}
        isMulti={isMulti}
        onChange={onChange}
        options={optionsList}
        placeholder={placeholder}
        className={className}
        isClearable={false}
        components={{
          Option: CustomSelectOption,
        }}
      />
    );
  }
}

SelectMultiTagsField.defaultProps = {
  isMulti: true,
  optionsList: [],
  placeholder: '',
  className: '',
};

SelectMultiTagsField.propTypes = {
  isMulti: PropTypes.bool,
  optionsList: PropTypes.array,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
export default SelectMultiTagsField;
