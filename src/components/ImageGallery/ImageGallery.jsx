import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({
  data,
  handleSelectPhoto,
  toggleIsModalVisible,
}) => {
  const imageContent = (
    <ul className={css.ImageGallery}>
      {data.map((photo) => (
        <ImageGalleryItem
          key={photo.id}
          imgSrc={photo.webformatURL}
          tags={photo.tags}
          largeImageURL={photo.largeImageURL}
          photo={photo}
          handleSelectPhoto={handleSelectPhoto}
          toggleIsModalVisible={toggleIsModalVisible}
        />
      ))}
    </ul>
  );

  return (
    <>
      {data.length === 0 ? (
        <h3 className={css.title}>No images found</h3>
      ) : (
        imageContent
      )}
    </>
  );
};

// export class ImageGallery extends Component {
//   render() {
//     const imageContent = (
//       <ul className={css.ImageGallery}>
//         {this.props.data.map((photo) => (
//           <ImageGalleryItem
//             key={photo.id}
//             imgSrc={photo.webformatURL}
//             tags={photo.tags}
//             largeImageURL={photo.largeImageURL}
//             photo={photo}
//             handleSelectPhoto={this.props.handleSelectPhoto}
//             toggleIsModalVisible={this.props.toggleIsModalVisible}
//           />
//         ))}
//       </ul>
//     );
//     return (
//       <>
//         {this.props.data.length === 0 ? (
//           <h3 className={css.title}>No images found</h3>
//         ) : (
//           imageContent
//         )}
//       </>
//     );
//   }
// }

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
};
