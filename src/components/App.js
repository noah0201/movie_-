import React,{useState,useEffect,useReducer} from 'react';
import logo from '../logo.svg';
import '../App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

// 初始状态
const initialState={
  loading:'true',
  movies:[],
  errorMessage: null
}

const reducer=(state,action)=>{
  // console.log(action)
  switch(action.type){
    case "SEARCH_MOVIES_REQUEST":
      return{
        ...state,
        loading:true,
        errorMessage:null
      }
    case "SEARCH_MOVIES_SUCCESS":
      return{
        ...state,
        movies:action.payload,
        loading:false
        
        
      }
    case "SEARCH_MOVIES_FAILURE":
      return{
        ...state,
        loading:false,
        errorMessage:action.error
    }
    default:
      return state
  }
}

function App() {
  // const [loading, setLoading] = useState(true)
  // const [movies, setMovies] = useState([])
  // const [errorMessage, setErrorMessage] = useState(null)
  const [state, dispatch] = useReducer(reducer,initialState)
  // console.log(state)
  const {movies,errorMessage,loading}=state
  // console.log(movies)
  // console.log(state)
  console.log(loading)

  useEffect(()=>{
    fetch(MOVIE_API_URL)
      .then(response=>response.json())
      .then(jsonResponse=>{
        // console.log(jsonResponse)
        dispatch({
          type:"SEARCH_MOVIES_SUCCESS",
          payload:jsonResponse.Search
        })
      })
  },[])

  // useEffect(()=>{
  //   fetch(MOVIE_API_URL)
  //   .then(response=>response.json())
  //   .then(jsonResponse=>{
  //     setMovies(jsonResponse.Search)
  //     setLoading(false)
  //   })
  // },[])

  // const search=(searchValue)=>{
  //   setLoading(true)
  //   setErrorMessage(null)

  //   fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(res=>res.json())
  //   .then(jsonResponse=>{
  //     if (jsonResponse.Response === "True") {
  //       setMovies(jsonResponse.Search);
  //       setLoading(false);
  //     } else {
  //       setErrorMessage(jsonResponse.Error);
  //       setLoading(false);
  //     } 
  //   })
  // }


  //采用分发方式进行分配状态 
  const search=(searchValue)=>{
    dispatch({
      type:"SEARCH_MOVIES_REQUEST"
    })
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((res) => res.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          console.log(jsonResponse.Search)
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search,
          });
        } else {
          // console.log(jsonResponse.Error);
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error,
          });
        }
      });
  }

  return (
    <div className="App">
      <Header text='Movie' />
      <Search search={search} />
      <p className='App-intro'>Sharing a few of our favourite movies</p>
      <div className='movies'>
        {loading&&!errorMessage?(
          <span>loading...</span>
        ):errorMessage?(
          <div className='errorMessage'>{errorMessage}</div>
        ):(
          movies.map((movie,index)=>(
            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
          ))
        )}
      </div>
    </div>
  )
        }

export default App;
