import { useEffect, useState } from "react";
import Select from "react-select";
const SelectComponent = ({ formik, ...props }) => {
  const initClass = {
    propertyType: false,
    region: false,
    queryTypes: false
  };

  useEffect(() => {
    formik?.setFieldValue(
      props?.name,
      props.defaultValue ? props.defaultValue : ""
    );
    // eslint-disable-next-line
  }, [props.defaultValue]);

  const [selectClass, setSelectClass] = useState(initClass);

  return (
    <div>
      <div className={`select-wrap ${props.className ? props.className : ""}`}>
        <label
          className={`${props.required ? "required" : ""} ${
            selectClass.propertyType ? "text-dark-gray" : ""
          } ${props.hideLabel ? "vHidden" : ""}`}
        >
          {props.label}
        </label>
        <Select
          className={`select`}
          name={props.name}
          value={props.defaultValue}
          onFocus={() => {
            setSelectClass({ ...initClass, propertyType: true });
          }}
          options={props.options}
          onBlur={() => {
            setSelectClass(initClass);
          }}
          placeholder={props?.placeholder}
          onChange={(e) => {
            if (formik) {
              if (props.isSetVal) {
                formik?.setFieldValue(props.name, e.value);
              } else {
                formik?.setFieldValue(props.name, e);
              }
            } else {
              props.onChange(e);
            }
          }}
        />
      </div>
      {props.isSetVal
        ? formik?.errors?.[props.name] &&
          formik?.touched?.[props.name] && (
            <div className="error">{formik?.errors?.[props.name]}</div>
          )
        : formik?.errors?.[props.name] &&
          formik?.touched?.[props.name] && (
            <div className="error">{formik?.errors?.[props.name]?.label}</div>
          )}
    </div>
  );
};

export default SelectComponent;
