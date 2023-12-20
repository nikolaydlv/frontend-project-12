import { useFilter } from '../../../hooks';

const Message = ({ message }) => {
  const filterProfanity = useFilter();

  return (
    <div className="text-break mb-2">
      <b>{message.user}</b>
      {': '}
      {filterProfanity(message.body)}
    </div>
  );
};

export default Message;
