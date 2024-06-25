import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { fetchData } from "../service";

function RecipeLists(props) {
  const [searchedTerm, setSearchedTerm] = useState('');
  const [query, setQuery] = useState('pasta');
  const [data, setData] = useState(null);
  const [dialogItem, setDialogItem] = useState(null);

  const searchRecipe = (searchQuery) => {
    props.setLoader(true);
    fetchData(searchQuery).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  };

  useEffect(() => {
    props.setLoader(true);
    fetchData(query).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  }, []);

  const handleRecipe = (item) => {
    setDialogItem(item);
  };

  return (
    <div className='container'>
      <div className='heading-line'>
        <strong>Search Recipes</strong>
        <div className='input-wrapper'>
          <input
            onChange={(e) => setSearchedTerm(e.target.value)}
            value={searchedTerm}
            type="text"
            placeholder='Search your recipe'
          />
          <button onClick={() => searchRecipe(searchedTerm)}>
            <BsSearch />
          </button>
        </div>
      </div>
      <div className='flexbox'>
        {data && data.hits.map((item, index) => (
          <div key={index} className='flexItem' onClick={() => handleRecipe(item.recipe)}>
            <div className='img-wrapper'>
              <img src={item.recipe.image} alt={item.recipe.label} />
            </div>
            <p>{item.recipe.label}</p>
          </div>
        ))}
      </div>
      {dialogItem && (
        <div className="dialog">
          <div className='dialog-background' onClick={()=>setDialogItem("")}></div>
          <div className='dialogbox'>
            <h4 className='title'>{dialogItem.label}</h4>
            <h5>Ingredients:</h5>
            <ul>
              {dialogItem.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeLists;