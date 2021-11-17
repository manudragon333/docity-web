export const Input = ({
  formik,
  type,
  name,
  label,
  required,
  className,
  disabled,
  onFocusOut,
  error,
  placeholder,
  onChange,
  max,
  maxLength,
}) => {
  return (
    <div className={className}>
      <div className="input-wrap">
        <input
          autoComplete="off"
          maxLength={maxLength}
          name={name}
          value={formik?.values?.[name]}
          type={type ? type : "text"}
          onChange={formik ? formik?.handleChange : onChange}
          disabled={disabled}
          onBlur={onFocusOut}
          placeholder={placeholder}
          max={max}
        />
        <label className={required ? "required" : ""}>{label}</label>
      </div>
      {formik?.errors?.[name] && formik?.touched?.[name] && (
        <div className="error">{formik?.errors?.[name]}</div>
      )}
      {error && !(formik?.errors?.[name] && formik?.touched?.[name]) && (
        <div className="error">{error}</div>
      )}
    </div>
  );
};
