import { Component } from "react";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.ImageGalleryItem}>
        <img
          src={this.props.imgSrc}
          alt={this.props.tags}
          title={this.props.tags}
          className={css.ImageGalleryItemImage}
          onClick={() => {
            this.props.handleSelectPhoto(this.props.photo);
            this.props.toggleIsModalVisible(this.props.photo);
          }}
        />
      </li>
    );
  }
}

// ImageGalleryItem.defaultProps = {
//   imgSrc: "https://placehold.co/600x400",
// };

ImageGalleryItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  photo: PropTypes.object.isRequired,
  handleSelectPhoto: PropTypes.func.isRequired,
  toggleIsModalVisible: PropTypes.func.isRequired,
};
