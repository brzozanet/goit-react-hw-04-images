import { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export const Modal = ({ largeImageURL, tags, toggleIsModalVisible }) => {
  useEffect(() => {
    // Dodanie obsługi zdarzenia dla naciśnięcia klawisza Esc po zamontowaniu komponentu
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    // Usunięcie obsługi zdarzenia po odmontowaniu komponentu
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    // Sprawdzenie, czy naciśnięto klawisz Esc
    if (event.key === "Escape") {
      toggleIsModalVisible();
    }
  };

  const handleOverlayClick = (event) => {
    // Sprawdzenie, czy kliknięcie nastąpiło poza obszarem zdjęcia
    if (event.target === event.currentTarget) {
      toggleIsModalVisible();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={largeImageURL} title={tags} alt={tags} />
      </div>
    </div>
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     // Dodanie obsługi zdarzenia dla naciśnięcia klawisza Esc po zamontowaniu komponentu
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     // Usunięcie obsługi zdarzenia po odmontowaniu komponentu
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (event) => {
//     // Sprawdzenie, czy naciśnięto klawisz Esc
//     if (event.key === "Escape") {
//       this.props.toggleIsModalVisible();
//     }
//   };

//   handleOverlayClick = (event) => {
//     // Sprawdzenie, czy kliknięcie nastąpiło poza obszarem zdjęcia
//     if (event.target === event.currentTarget) {
//       this.props.toggleIsModalVisible();
//     }
//   };

//   render() {
//     return (
//       <div className={css.overlay} onClick={this.handleOverlayClick}>
//         <div className={css.modal}>
//           <img
//             src={this.props.largeImageURL}
//             title={this.props.tags}
//             alt={this.props.tags}
//           />
//         </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  toggleIsModalVisible: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
