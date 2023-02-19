import PropTypes from 'prop-types';
import css from 'styles.module.css';

export const Button = ({ onloadMore }) => {
    return (
      <div className={css.ButtonConteiner}>
        <button type="button" className={css.Button} onClick={onloadMore}>
          Load more
        </button>
      </div>
    );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};
