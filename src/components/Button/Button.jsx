import { IMG_PER_PAGE } from "../../services/pixabayAPI";
import PropTypes from "prop-types";
import css from "./Button.module.css";

export const Button = ({ handleLoadMore }) => {
  return (
    <div className={css.ButtonContainer}>
      <div className={css.Button} onClick={handleLoadMore}>
        Load {IMG_PER_PAGE} more...
      </div>
    </div>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
