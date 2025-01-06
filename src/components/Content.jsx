import React, { useState, useEffect } from 'react'
import { Container, Button, Card, Row, Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import axiosInstance from "../apis/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlist';
import LanguageContext from '../context/language';

export default function Content(props) {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const { language } = React.useContext(LanguageContext);
  const dispatch = useDispatch();
  const { movies, setMovies } = props;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  useEffect(() => {
    axiosInstance
      .get("discover/movie", {
        params: {
          page: page,
          popularity: "desc",
          language: language,
        }
      })
      .then((res) => setMovies(res.data.results) || console.log(res.data.results))
      .catch((err) => console.log(err));
  }, [page, language]);
  const handleAddToWishlist = (e, movieId) => {
    e.stopPropagation();
    axiosInstance.get(`movie/${movieId}`)
      .then((res) => dispatch(addToWishlist(res.data)) || console.log(wishlist))
      .catch((err) => console.log(err));
    }
  const handleRemoveFromWishlist = (e, movieId) => {
    e.stopPropagation();
    dispatch(removeFromWishlist(movieId));
  }
  return (
    <Container className='mt-5'>
      <Pagination className='justify-content-center'>
        <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
        {[1, 2, 3].map((pageNumber) => (
          <Pagination.Item key={pageNumber} active={pageNumber === page} onClick={() => setPage(pageNumber)}>
            {pageNumber}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setPage(page + 1)} />
      </Pagination>
      <Row className='justify-content-evenly'>
        {movies?.map((movie) => (
          <Card style={{ width: '18rem', border: 'none', padding:'0', marginBottom:'15px' }} key={movie.id} >
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ borderRadius: '20px',  cursor: 'pointer' }} onClick={() => navigate(`/movie/${movie.id}`)}/>
            <Card.Body className='row' style={{ padding: '10px', textAlign: 'left' }}>
              <Card.Text className="col" style={{marginBottom:'0px'}}>{Math.floor(movie.vote_average * 10) / 10}<FontAwesomeIcon style={{ color: 'rgb(190, 168, 68)'}} icon={faStar}></FontAwesomeIcon></Card.Text>
              <Card.Text className='col-auto' style={{marginBottom:'0px'}}>{movie.release_date}</Card.Text>
              <div className="col" style={{textAlign: 'right'}}>{wishlist.some((wish) => wish.id === movie.id) ? <FontAwesomeIcon onClick={(e) => handleRemoveFromWishlist(e, movie.id)} icon={faHeart} style={{ color: 'rgb(190, 168, 68)', fontSize: '1.6rem', cursor:'pointer' }} /> : <FontAwesomeIcon onClick={(e) => handleAddToWishlist(e, movie.id)} icon={faHeartRegular} style={{ color: 'rgb(190, 168, 68)', fontSize: '1.6rem', cursor:'pointer' }} />}</div>
            </Card.Body>
          </Card>
        ))}
      </Row>
      <Pagination className='justify-content-center'>
        <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
        {[1, 2, 3].map((pageNumber) => (
          <Pagination.Item key={pageNumber} active={pageNumber === page} onClick={() => setPage(pageNumber)}>
            {pageNumber}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setPage(page + 1)} />
      </Pagination>
    </Container>
  )
}
