import React from "react";

// 电影没有图片时用的图片
const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie=({movie})=>{
  // movie.Poster是电影图片的链接 N/A电影没有配图片时
  const poster=movie.Poster==='N/A'?DEFAULT_PLACEHOLDER_IMAGE:movie.Poster
  // console.log(poster);
  // console.log(movie)
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img width='200' src={poster} alt={`The movie titled: ${movie.Title}`} />
      </div>
      <p>{movie.Year}</p>
    </div>
  );
}
export default Movie