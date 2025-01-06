import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlist';
import { Card, Row } from 'react-bootstrap';
import axiosInstance from '../apis/config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router';
import LanguageContext from '../context/language';

export default function Wishlist() {
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const {language} = React.useContext(LanguageContext)  
  
  const handleAddToWishlist = (e, movieId) => {
    e.stopPropagation();
    axiosInstance.get(`movie/${movieId}`, {
      params:{
        language: language
      },
    })
      .then((res) => dispatch(addToWishlist(res.data)) || console.log(wishlist))
      .catch((err) => console.log(err));
    }
  const handleRemoveFromWishlist = (e, movieId) => {
    e.stopPropagation();
    dispatch(removeFromWishlist(movieId));
  }
  return (
    <div>Wishlist
      <Row className='justify-content-evenly'>
        {wishlist?.map((movie) => (
          <Card className='g-4' style={{ width: '18rem', cursor: 'pointer', border: 'none' }} key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ borderRadius: '20px' }} />
            <Card.Body className='row' style={{ padding: '10px', textAlign: 'left' }}>
              <div className="col">
                <Card.Title style={{ marginBottom: '5px' }}>{movie.title}</Card.Title>
                <Card.Text >{Math.floor(movie.vote_average * 10) / 10}<FontAwesomeIcon style={{ color: 'rgb(190, 168, 68)' }} icon={faStar}></FontAwesomeIcon></Card.Text>
              </div>
              <div className="col" style={{ textAlign: 'right' }}>
                {wishlist.some((wish) => wish.id === movie.id) ? <FontAwesomeIcon onClick={(e) => handleRemoveFromWishlist(e, movie.id)} icon={faHeart} style={{ color: 'rgb(190, 168, 68)', fontSize: '1.6rem' }} /> : <FontAwesomeIcon onClick={(e) => handleAddToWishlist(e, movie.id)} icon={faHeartRegular} style={{ color: 'rgb(190, 168, 68)', fontSize: '1.6rem' }} />}
                <Card.Text>{movie.release_date}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </div>
  )
}
