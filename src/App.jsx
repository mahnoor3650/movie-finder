import { useState, useEffect } from "react";
import "./App.css";
import Search from "./Componnets/serach";
import Spinner from "./Componnets/Spinner";
import MovieCard from "./Componnets/movieCard";
import { useDebounce } from "use-debounce";
import { getTrendingMovies, updateSerachCount } from "./appwrite";
const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
};

function App() {
  const [SerachTerm, setSearchTerm] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [MovieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [denouceSercahTerm, setDenouceSercahTerm] = useState("");

  const [debouncedSearchTerm] = useDebounce(SerachTerm, 500);
  useEffect(() => {
    setDenouceSercahTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  const fetchMovies = async (query) => {
    setIsloading(true);
    setErrorMsg("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("failed to fetch movies");
      }

      const data = await response.json();
      if (data.Response === "False") {
        setMovieList([]);
        setErrorMsg(data.error || "Failed to Fetch Movies");
        return;
      }
      // console.log("data", data);
      setMovieList(data.results || []);
   if(query && data.results.length >0)
   {
    await updateSerachCount(query, data.results[0]);
   }
    } catch (error) {
      setErrorMsg("Error Fetching movies");
      // console.log(`Error occur ${error}`);
    } finally {
      setIsloading(false);
    }
  };
  const loadTrendingMovies =async()=>{
    try {
      const movies= await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMovies(denouceSercahTerm);
   
    // console.log("debuce", denouceSercahTerm);
  }, [denouceSercahTerm]);
    useEffect(() => {
 loadTrendingMovies();
      
    }, []);
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="hero image"></img>
            <h1>
              Find <span className="text-gradient">Movies</span> you'll enjoy
              without the hassle
            </h1>
            <Search SerachTerm={SerachTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies.length >0 &&(
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie,index)=>(
                  <li key={movie.$id}>
                    <p >{index+1}</p>
                    <img src={movie.poster_url
                    } alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="all-movies">
            <h2 >All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : ErrorMsg ? (
              <p className="text-red-500">{ErrorMsg}</p>
            ) : (
              <ul>
                {MovieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
