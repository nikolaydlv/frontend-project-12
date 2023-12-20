import Add from './Add';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const getModal = (modalType) => modals[modalType];

const getModalComponent = (modalType) => {
  if (modalType === null) return null;

  const Component = getModal(modalType);

  return <Component />;
};

export default getModalComponent;
