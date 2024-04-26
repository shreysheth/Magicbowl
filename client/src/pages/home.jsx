import axios from "axios";
import { useState, useEffect } from "react";
export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const url = "http://localhost:5000/api";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${url}/recipe`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (id) => {
    try {
        // const response = axios.get(`${url}/recipe/${id}`);
        // console.log(response.data);
        setSelectedRecipeId(id);
        console.log(selectedRecipeId);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
      <div className="container-fluid m-2">
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="col">
              <div className="card" style={{ width: "18rem" }}>
                <img src={recipe.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h6 className="card-title mb-2">{recipe.name}</h6>
                  <p className="card-subtitle mb-2 text-body-secondary">
                    by {recipe.author}
                  </p>
                  <p className="card-text overflow-hidden">{recipe.description}</p>
                  <button onClick={() => handleRecipeClick(recipe._id)} className="btn btn-primary">Read more</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
