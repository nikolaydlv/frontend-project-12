import { Form } from 'react-bootstrap';

const InputField = (props) => {
  const { values } = props;

  const {
    formik,
    field,
    type,
    placeholder,
    failed,
    inputNameRef,
    error,
  } = values;

  return (
    <Form.Floating className="mb-3">
      <Form.Control
        name={field}
        autoComplete={field}
        placeholder={placeholder}
        id={field}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[field]}
        isInvalid={failed}
        ref={inputNameRef}
      />
      <Form.Label htmlFor={field}>{placeholder}</Form.Label>
      <Form.Control.Feedback type="invalid" tooltip>{error}</Form.Control.Feedback>
    </Form.Floating>
  );
};

export default InputField;
