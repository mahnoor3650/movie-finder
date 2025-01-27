import { useState, useEffect } from "react";
import "./App.css";
import Search from "./Componnets/serach";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${API_KEY}`}
};
function App() {
  const [SerachTerm, setSearchTerm] = useState("");
  const [ErrorMsg, setErrorMsg]= useState("");
  const fetchMovies = async () => {
    try {
      
      const endpoint = `${API_BASE_URL}//discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok)
      {
        throw new Error("failed to fetch movies");
      }

    const data= await response.json();
    console.log("data",data)
    } catch (error) {
      setErrorMsg("Error Fetching movies")
      console.log(`Error occur ${error}`);
    }
  };
  useEffect(() => { fetchMovies()}, []);
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
          <div className="all-movies">
            <h2>All Movies</h2>
            {ErrorMsg && <p className="error-messsage">{ErrorMsg}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
