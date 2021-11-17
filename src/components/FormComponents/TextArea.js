export const TextArea = ({ formik, type, name, label, required }) => {
  return (
    <div>
      <h4
        className={
          required ? "text-dark-gray p1 required" : "text-dark-gray p1"
        }
      >
        {label}
      </h4>
      <div className="textarea-wrap mb1">
        <textarea
          autoComplete="off"
          name={name}
          rows="10"
          value={formik?.values?.[name]}
          type={type ? type : "text"}
          onChange={formik?.handleChange}
          placeholder="Your Message"
        />
      </div>
      {formik?.errors?.[name] && formik?.touched?.[name] && (
        <div className="error">{formik?.errors?.[name]}</div>
      )}
    </div>
  );
};
