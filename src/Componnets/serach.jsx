

const Search = ({ SerachTerm, setSearchTerm }) => {
  return <div className="search">
    <div>
        <img src="./search.svg" alt="serach"></img>
        <input 
        type="text"
        value={SerachTerm}
        placeholder="Serach movie of you like"
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
    </div>
  </div>;
};
export default Search;
