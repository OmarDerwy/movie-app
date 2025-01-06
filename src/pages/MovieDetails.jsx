import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import axiosInstance from "../apis/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlist";
import LanguageContext from "../context/language";

export default function MovieDetails() {
	const wishlist = useSelector((state) => state.wishlist.wishlist);
	const dispatch = useDispatch();
        const [movie, setMovie] = useState();
        const params = useParams();
        const {language} = React.useContext(LanguageContext)

    useEffect(() => {
        axiosInstance
          .get(`/movie/${params.id}`, {
                params: {
                        language: language
                }
          })
          .then((res) => setMovie(res.data ) || console.log(res.data))
          .catch((err) => console.log(err));
      }, [params.id, language]);


      const handleAddToWishlist = (e, movieId) => {
			dispatch(addToWishlist(movie));
        }
      const handleRemoveFromWishlist = (e, movieId) => {
        e.stopPropagation();
        dispatch(removeFromWishlist(movieId));
      }
	  const isInWishlist = (movieId) => {
		return wishlist.some((item) => item.id === movieId);
	  };
return (
    <div className="container"><br /><br />
            <div className="row">
                    <div className="col">
                            <img src={`https://image.tmdb.org/t/p/w400${movie?.poster_path}`} alt="" style={{borderRadius: '20px'}} />
                    </div>
                    <div className="col" style={{textAlign: 'left'}}>
                            <h1>{movie?.title}</h1>
                            <p>Rating: {Array.from({ length: Math.floor(movie?.vote_average) }, (_, i) => (
                                    <FontAwesomeIcon key={i} icon={faStar} />
                            ))} {Math.floor(movie?.vote_average*10)/10}/10 &nbsp;<FontAwesomeIcon
                            icon={isInWishlist(movie?.id) ? faHeartSolid : faHeartRegular}
                            onClick={(e) => isInWishlist(movie?.id) ? handleRemoveFromWishlist(e, movie?.id) : handleAddToWishlist(e, movie)}
                            style={{ cursor: 'pointer', color: 'rgb(190, 168, 68)' , fontSize: '1.6rem' }}
							/>
							</p>
                            <p>{movie?.overview}</p>
                            <p>Release Date: {movie?.release_date}</p>
                    </div>
            </div>
    </div>
)
}
