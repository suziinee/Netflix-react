import axios from '../axios';
import React, { useEffect, useState } from 'react'
import './Row.css';

const baseUrl = "https://image.tmdb.org/t/p/original/";

const Row = (props) => {
    const [movies, setMovies] = useState([]);

    //화면이 한번 렌더링되고 나서 실행되는 useEffect
    useEffect(() => {
        
        //async : fetchData()가 비동기적으로 동작하도록 명시
        async function fetchData() {
            const request = await axios.get(props.fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, []);

    // console.log(movies);

  return (
    <div className="row">
        {/* title */}
        <h2>{props.title}</h2>

        <div className="row__posters">
            {/* 여러 장의 영화 포스터 */}
            {movies.map((movie) => 
                //isLargeRow가 true면 row__posterLarge가 나옴
                <img key={movie.id}
                     className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
                     src={`${baseUrl}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                     alt={movie.name}/>
                )}
        </div>
    </div>
  )
}

export default Row