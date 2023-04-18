import React, {useState, useEffect} from 'react';
import '../layout/layout.css';
import '../home/homepage.css';
import useDebounce from '../../hooks/useDebounce';
import { IMovie, IMovieResult } from '../../interfaces/interface';
import './search.css';
import MovieResult from '../../components/movieResult/MovieResult';
import { useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  addToFavourites, deleteMovie
} from "../../redux/reducers/MovieFavoriteSlice";
import ButtonForFavourites from '../../components/buttonForFavorite/ButtonForFavorite';
// import { checkInFavorite } from '../../components/buttonForFavorite/ButtonForFavorite';


async function searchRequest(search: any) {
  const URL = `https://omdbapi.com/?s=${search}&page=1&apikey=3140da31`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  console.log(data.Search);

  if (data.Search)
    return data.Search
  else console.log('error')
}


const Movies = () => {

  // для поискового запроса
  const [search, setSearchTerm] = useState('');
  // для результатов поиска
  const [result, setResults] = useState([]);
  // для статуса поиска (есть ли ожидающий запрос)
  const [isSearching, setIsSearching] = useState(false);
  const [getItem, setGetItem] = useState(false);
  const [isError, setIsError] = useState(false);


  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        // изм состояние isSearching
        setGetItem(true)
        setIsSearching(true);
        // запрос к АПИ
        searchRequest(debouncedSearchTerm).then(results => {
          // состояние в false, тк запрос завершен
          setIsSearching(false);

          if (results == undefined) {
            console.log('ERROR')
            setIsError(true)
            setResults([])
          }
          else {
            setResults(results)
            setIsError(false)
          }
        });

      } else {
        setResults([]);
        setIsError(false)
        setGetItem(false)
      }
    },
    [debouncedSearchTerm]
  );

  const dispatch = useAppDispatch();
  const { favoriteMovies } = useAppSelector(
    (state) => state.movieFavoriteReducer
  );

  const [inFavorite, setInFavorite] = useState(true);

  async function loadMovieDetails(imdbID: any) {
    const URL = `https://omdbapi.com/?i=${imdbID}&apikey=3140da31`;
    const res = await fetch(`${URL}`);
    const data: IMovieResult= await res.json();
    

    // if (!favoriteMovies.find(
    //   (favoriteMovie) => favoriteMovie.imdbID === data.imdbID))
    //   return setInFavorite(true)
    // else return setInFavorite(false)
    // setInFavorite(false)
    if (data !== undefined)
      return setMovie(data),
              setmovieDetail(true)
    else console.log('error')
  }

  const [movie, setMovie] = useState<IMovieResult>();
  const [movieDetail, setmovieDetail] = useState(false);


  // const [inFavorite, setInFavorite] = useState(true);



  // function addMovies() {
  //   dispatch(addToFavourites(movie))
  //   setInFavorite(false)
  // }

  // function deleteMovies() {
  //   dispatch(deleteMovie(movie))
  //   setInFavorite(true)
  // }

  // function checkInFavorite() {
  //   if (!favoriteMovies.find((favoriteMovie) => favoriteMovie.imdbID === movie.imdbID))
  //     return setInFavorite(true)
  //   else setInFavorite(false)
  // }



  return (
    <div className='blog-search'>
      <div className='container'>
        <div className="blog-search-content">
          <div className='blog-search-input-wrap'>
              
            <div><h2 className='blog-search-title'>Search Movies:</h2></div>

            <div>
              <div className='blog-search-input-loop'>
                <input className='blog-search-input' placeholder='Film, Series' onChange={e => setSearchTerm(e.target.value)} />
                <div className='blog-search-loop-wrap'><a className='fa-solid fa-magnifying-glass fa-lg search-loop'></a></div>
              </div>
              {isSearching && <div><i className="fa-regular fa-loader fa-spin"></i></div>}
              
              {getItem && <div className="blog-search-list-active" id="blog-search-list" >
                      {/* {isError && <div className='notFound'>More letters</div>} */}
                        {result.map((item: IMovie) => (
                            <div className="blog-search-list-item"
                              key={item.imdbID}
                              onClick={() => loadMovieDetails(item.imdbID)}>
                              <div className="blog-search-item-thumbnail">
                                <img src={(item.Poster != "N/A") ? item.Poster : "/image/no_image.jpg"} className='img-poster' />
                              </div>
                              <div className="blog-search-item-info">
                                <h3>{item.Title}</h3>
                                <p>{item.Year}</p>
                              </div>
                            </div>
                          ),
                          )
                          
                        }
                </div>
              }
            </div>
          </div >

            <div className='film-card'>

            {movieDetail && 
              <div className="result-content" id="result-content">
              <div className="movie-poster">
                <img src={(movie?.Poster != "N/A") ? movie?.Poster : "/image/no_image.jpg"} alt="movie poster" />
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie?.Title}</h3>
                <ul className="movie-misc-info">
                    <li className="year">Year: {movie?.Year}</li>
                    <li className="rated">Ratings: {movie?.Rating}</li>
                    <li className="released">Released: {movie?.Released}</li>
                </ul>
                <p className="genre"><b>Genre:</b> {movie?.Genre}</p>
                  <p className="writer"><b>Writer:</b> {movie?.Writer}</p>
                  <p className="actors"><b>Actors: </b>{movie?.Actors}</p>
                  <p className="plot"><b>Plot:</b> {movie?.Plot}</p>
                  <div className='info-heart'>
                    <div>
                      <p className="language"><b>Language:</b>{movie?.Language}</p>
                      <p className="awards"><b><i className="fas fa-award"></i></b>{movie?.Awards}</p>
                    </div>
                   <ButtonForFavourites movie={movie}></ButtonForFavourites>
                  </div>

              </div>
            </div>
            ||
              <div className="result-content" id="result-content">
                <div className="movie-poster">
                  <img src="/image/new-movie2.jpg" alt="movie poster" />
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">Federico Chiesa - Back on Track</h3>
                  <ul className="movie-misc-info">
                    <li className="year">Year: 2023</li>
                    <li className="rated">Ratings: 6.9/10</li>
                    <li className="released">Released: February 3, 2023</li>
                  </ul>
                  <p className="genre"><b>Genre:</b> Documentary</p>
                  <p className="writer"><b>Writer:</b>Alessandro D'Ottavi</p>
                  <p className="actors"><b>Actors: </b>Edoardo Bandini, Fabrizio Borri, Lucia Bramani</p>
                  <p className="plot"><b>Plot:</b>9 January 2022, the Stadio Olimpico in Rome. 30 minutes into the first half, Federico Chiesa collapses to the ground, screaming in pain. He has torn the cruciate ligament of his left knee. A ten-month ordeal, during which Federico will have to rediscover himself as a footballer and as a man, begins here. By his side, his family, his teammates, the Juventus staff and a precious new love</p>
                  <div className='info-heart'>
                    <div>
                      <p className="language"><b>Language:</b>Italian</p>
                      <p className="awards"><b><i className="fas fa-award"></i></b>no information</p>
                    </div>
                    {/* <ButtonForFavourites movie={movie} ></ButtonForFavourites> */}
                  </div>
                </div>
              </div>
            
            }
            </div>
        </div>
          </div>
        </div>
  
)
}

export default Movies
