import { useEffect, useState } from "react"
import { fetchImages } from './API';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';


export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const per_page = 12;


  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      if (hits.length === 0) {
        return alert('Sorry, nothing found 🤷‍♂️');
      }
      console.log(hits, totalHits);
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  

  };

  const formSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onloadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    console.log(largeImageURL);
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={formSubmit} />

      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {error && <p>❌something went wrong❌</p>}

      {loadMore && <Button onloadMore={onloadMore} page={page} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </>
  );




}

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     per_page: 12,
//     isLoading: false,
//     loadMore: false,
//     error: null,
//     showModal: false,
//     largeImageURL: 'largeImageURL',
//     id: null,
//   };

//   componentDidUpdate(_, prevState) {
//     console.log(prevState.page);
//     console.log(this.state.page);
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.getImages(searchQuery, page);
//     }
//   }

//   getImages = async (inputValue, page) => {
//     this.setState({ isLoading: true });
//     if (!inputValue) {
//       return;
//     }
//     try {
//       const { hits, totalHits } = await fetchImages(inputValue, page);
//       console.log(hits, totalHits);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   formSubmit = searchQuery => {
//     this.setState({
//       searchQuery,
//       images: [],
//       page: 1,
//       loadMore: false,
//     });
//   };

//   onloadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
   
//   };
 
//   openModal = largeImageURL => {
//     console.log(largeImageURL);
//     this.setState({
//       showModal: true,
//       largeImageURL: largeImageURL,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//     });
//   };

//   render() {
//     const { images, isLoading, loadMore, page, showModal, largeImageURL } =
//       this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.formSubmit} />

//         {isLoading ? (
//           <Loader />
//         ) : (
//           <ImageGallery images={images} openModal={this.openModal} />
//         )}

//         {loadMore && <Button onloadMore={this.onloadMore} page={page} />}

//         {showModal && (
//           <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
//         )}
//       </div>
//     );
//   }
// }
