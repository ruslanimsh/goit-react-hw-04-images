import { useEffect } from "react";
import PropTypes from 'prop-types';
import css from 'styles.module.css';

export const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };










  // export class Modal extends Component {
  //   componentDidMount() {
  //     window.addEventListener('keydown', this.handleKeyDown);
  //   }

  //   componentWillUnmount() {
  //     window.removeEventListener('keydown', this.handleKeyDown);
  //   }

  //   handleKeyDown = e => {
  //     if (e.code === 'Escape') {
  //       this.props.onClose();
  //     }
  //   };

  //   handleBackDropClick = e => {
  //     if (e.currentTarget === e.target) {
  //       this.props.onClose();
  //     }
  //   };

  
  return (
    <div className={css.Overlay} onClick={handleBackDropClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
      
  );
  
};

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageUrl: PropTypes.string.isRequired,
};
