import React, { useEffect, useState } from 'react'
import requests from '../requests';
import './Banner.css';
//axios.js 모듈을 import
import axios from '../axios';


const Banner = () => {
    const [movie, setMovie] = useState([]); //초기값 : 빈 배열

    //useEffect() hook
    useEffect(() => {
        //화면이 초기에 렌더링된 직후 한 번 호출.

        //API 서버에 데이터 요청하는 부분.
        async function fetchData() { //async, await
            
            //비동기 요청으로 받아온 응답 데이터
            //여기서 axios는 axios.js의 instance
            const request = await axios.get(requests.fetchNetflixOriginals);
            
            const randomMovie = request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ];
            setMovie(randomMovie);
        }
        
        fetchData();
       
    }, []);

    //줄거리 일정길이 이상 넘어가면 자르기
    function truncate(str, n) {
        return str?.length > n ?  str.substr(0, n-1) + "..." : str;
    }

  return (
    <header className='banner' style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center center'
    }}>
        {/* Background image */}
        <div className="banner__contents">
            <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
            
            <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>    

            {/* description */}
            <h1 className="banner__description">
                {truncate(movie?.overview, 150)}
            </h1>
        </div>

        <div className="banner--fadeBottom"></div>
    </header>
  )
}

export default Banner