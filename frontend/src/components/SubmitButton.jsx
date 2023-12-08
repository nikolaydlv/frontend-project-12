import { Button } from 'react-bootstrap';

const SubmitButton = (props) => {
  const { values } = props;
  const { formik, title } = values;

  return (
    <Button
      type="submit"
      variant="outline-primary"
      className="w-100 mb-3"
      disabled={formik.isSubmitting}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
