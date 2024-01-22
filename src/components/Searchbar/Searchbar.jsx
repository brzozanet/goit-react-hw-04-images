import css from "./Searchbar.module.css";
import PropTypes from "prop-types";
import pixabayLogo from "../../images/pixabay.svg";

export const Searchbar = ({ handleSearch }) => {
  return (
    <header className={css.Searchbar}>
      <img src={pixabayLogo} alt="pixabay" height="40" />
      <input
        className={css.Input}
        type="text"
        placeholder="Search images and photos..."
        onKeyUp={event => {
          if (event.code === "Enter") {
            handleSearch(event.target.value);
          }
        }}
      />
    </header>
  );
};

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
