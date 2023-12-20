import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <div className="m-auto w-auto text-center">
    <Spinner variant="primary" animation="border" role="status" />
  </div>
);

export default LoadingSpinner;
