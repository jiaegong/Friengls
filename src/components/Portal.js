import reactDom from 'react-dom';

const Portal = ({ children }) => {
  const el = document.getElementById('ReviewModal');
  return reactDom.createPortal(children, el);
};

export default Portal;
