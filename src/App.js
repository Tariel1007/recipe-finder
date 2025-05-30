import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=YOUR_API_KEY&query=${query}&number=10`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe Finder</h1>
        <form onSubmit={searchRecipes}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recipes..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </header>

      <main className="recipes-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
                <p>Ready in {recipe.readyInMinutes} minutes</p>
                <p>Servings: {recipe.servings}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
