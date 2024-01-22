import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { getPhotos, IMG_PER_PAGE } from "./services/pixabayAPI";
import { Loader } from "./components/Loader/Loader";
import { Button } from "./components/Button/Button";
import { Modal } from "./components/Modal/Modal";
import { useState } from "react";

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSearch = async (querySearch) => {
    try {
      setIsLoading(true);
      const photos = await getPhotos(querySearch, page, IMG_PER_PAGE);
      setQuerySearch(querySearch);
      setPhotos(photos);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
      const morePhotos = await getPhotos(querySearch, page + 1);
      setPhotos((prevPhotos) => [...prevPhotos, ...morePhotos]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  const toggleIsModalVisible = (photo) => {
    setIsModalVisible((prevState) => !prevState);
    setSelectedPhoto(photo || null);
  };

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
      {isLoading && <Loader />}
      {errorMessage && <div>{errorMessage}</div>}
      {!errorMessage && (
        <ImageGallery
          data={photos}
          handleSelectPhoto={handleSelectPhoto}
          toggleIsModalVisible={toggleIsModalVisible}
        />
      )}
      {photos.length !== 0 && <Button handleLoadMore={handleLoadMore} />}
      {isModalVisible && (
        <Modal
          largeImageURL={selectedPhoto?.largeImageURL}
          tags={selectedPhoto?.tags}
          toggleIsModalVisible={toggleIsModalVisible}
        />
      )}
    </>
  );
};

// export class AppCls extends Component {
// state = {
//   photos: [],
//   photosPerPage: IMG_PER_PAGE,
//   page: 1,
//   isLoading: false,
//   isModalVisible: false,
//   errorMessage: "",
//   querySearch: "",
//   selectedPhoto: null,
// };
// handleSearch = async (querySearch) => {
//   try {
//     this.setState({
//       isLoading: true,
//       photos: [],
//       errorMessage: "",
//       page: 1,
//       querySearch,
//     });
//     const photos = await getPhotos(
//       querySearch,
//       this.state.page,
//       this.state.photosPerPage
//     );
//     this.setState({
//       photos,
//     });
//   } catch (error) {
//     this.setState({ errorMessage: error.message });
//   } finally {
//     this.setState({
//       isLoading: false,
//     });
//   }
// };
// handleLoadMore = async () => {
//   try {
//     this.setState(
//       (prevState) => ({
//         isLoading: true,
//         errorMessage: "",
//         page: prevState.page + 1,
//       }),
//       async () => {
//         const morePhotos = await getPhotos(
//           this.state.querySearch,
//           this.state.page
//         );
//         this.setState((prevState) => ({
//           photos: [...prevState.photos, ...morePhotos],
//           isLoading: false,
//         }));
//       }
//     );
//   } catch (error) {
//     this.setState({ errorMessage: error.message, isLoading: false });
//   } finally {
//     this.setState({
//       isLoading: false,
//     });
//   }
// };
// handleSelectPhoto = (photo) => {
//   this.setState({ selectedPhoto: photo });
// };
// toggleIsModalVisible = (photo) => {
//   this.setState((prevState) => ({
//     isModalVisible: !prevState.isModalVisible,
//     selectedPhoto: photo || null,
//   }));
// };
// render() {
//   return (
//     <>
//       <Searchbar handleSearch={this.handleSearch} />
//       {this.state.isLoading && <Loader />}
//       {this.state.errorMessage && <div>{this.state.errorMessage}</div>}
//       {!this.state.errorMessage && (
//         <ImageGallery
//           data={this.state.photos}
//           handleSelectPhoto={this.handleSelectPhoto}
//           toggleIsModalVisible={this.toggleIsModalVisible}
//         />
//       )}
//       {this.state.photos.length !== 0 && (
//         <Button handleLoadMore={this.handleLoadMore} />
//       )}
//       {this.state.isModalVisible && (
//         <Modal
//           largeImageURL={this.state.selectedPhoto?.largeImageURL}
//           tags={this.state.selectedPhoto?.tags}
//           toggleIsModalVisible={this.toggleIsModalVisible}
//         />
//       )}
//     </>
//   );
// }
// }
