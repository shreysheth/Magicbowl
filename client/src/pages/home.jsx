import axios from "axios";
import { useState, useEffect } from "react";
import BackToTopButton from "../components/backToTop";
export const Home = (recipeList) => {
  const [recipes, setRecipes] = useState([]); 
  const [selectedRecipe, setSelectedRecipe] = useState({
    _id: "",
    name: "",
    url: "",
    description: "",
    author: "",
    isVegetarian: false,
    prepTime: {
      hours: 0,
      minutes: 0,
      _id: "",
    },
    cookTime: {
      hours: 0,
      minutes: 0,
      _id: "",
    },
    ingredients: [],
    method: [],
    likes: 0,
    saves: 0,
    image: "",
  });
  const url = "http://localhost:5000/api/recipe";

  useEffect(() => {
    const fetchRecipes = async (recipeList) => {
      try {
        if (recipeList.length > 0) {
          setRecipes(recipeList);
        } else {
          const response = await axios.get(`${url}`);
          setRecipes(response.data)
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes(recipeList.recipeList);
  }, [recipeList.recipeList]);

  const handleRecipeClick = async (id) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-fluid mt-3 mb-2">
        <div className="row row-cols g-2">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="col mb-3"
              style={{ cursor: "default" }}
            >
              <div className="card" style={{ width: "18rem" }}>
                <img src={recipe.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h6
                    className="card-title mb-2 text-truncate"
                    title={recipe.name}
                  >
                    {recipe.name}
                  </h6>
                  <p className="card-subtitle mb-2 text-body-secondary">
                    by {recipe.author} |{" "}
                    {recipe.isVegetarian ? (
                      <i className="fas fa-leaf text-success"></i>
                    ) : (
                      <i className="fas fa-drumstick-bite text-danger"></i>
                    )}
                  </p>
                  <p
                    className="card-text text-truncate"
                    title={recipe.description}
                  >
                    {recipe.description}
                  </p>
                  <button
                    onClick={() => handleRecipeClick(recipe._id)}
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#recipeModal"
                  >
                    Open Recipe
                  </button>
                  <button
                    onClick={() => handleRecipeClick(recipe._id)}
                    className="btn btn-danger ms-2"
                  >
                    <i className="bi bi-heart"></i>
                  </button>
                  <button
                    onClick={() => handleRecipeClick(recipe._id)}
                    className="btn btn-warning ms-2"
                  >
                    <i className="bi bi-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="recipeModal"
        tabIndex="-1"
        aria-labelledby="recipeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="recipeModalLabel">
                {selectedRecipe.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-2">
                    <img
                      className="img-thumbnail rounded-2"
                      src={selectedRecipe.image}
                      alt={`${selectedRecipe.name} image`}
                    />
                  </div>
                  <div className="col-10">
                    <p>
                      By {selectedRecipe.author} |{" "}
                      {selectedRecipe.isVegetarian ? (
                        <i className="fas fa-leaf text-success"></i>
                      ) : (
                        <i className="fas fa-drumstick-bite text-danger"></i>
                      )}
                    </p>
                    <p>
                      <i className="bi bi-clock-history"></i> Preparation Time:{" "}
                      {selectedRecipe.prepTime.hours > 0
                        ? `${selectedRecipe.prepTime.hours} hours`
                        : ""}{" "}
                      {selectedRecipe.prepTime.minutes > 0
                        ? `${selectedRecipe.prepTime.minutes} minutes`
                        : ""}
                    </p>
                    <p>
                      <i className="bi bi-clock-history"></i> Cooking Time:{" "}
                      {selectedRecipe.cookTime.hours > 0
                        ? `${selectedRecipe.cookTime.hours} hours`
                        : ""}{" "}
                      {selectedRecipe.cookTime.minutes > 0
                        ? `${selectedRecipe.cookTime.minutes} minutes`
                        : ""}
                    </p>
                    <p>{selectedRecipe.description}</p>
                    <p>
                      <i className="bi bi-heart-fill text-danger"></i>{" "}
                      {selectedRecipe.likes} &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      <i className="bi bi-bookmark-fill text-warning"></i>{" "}
                      {selectedRecipe.saves}
                    </p>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4">
                    <div className="card">
                      <div className="card-header">Ingredients</div>
                      <ul className="list-group list-group-flush">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="list-group-item">
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="card">
                      <div className="card-header">Method</div>
                      <ul className="list-group list-group-flush">
                        {selectedRecipe.method.map((step, index) => (
                          <li key={index} className="list-group-item">
                            <p>Step {index + 1}:</p>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger">
                <i className="bi bi-heart"></i>
              </button>
              <button type="button" className="btn btn-warning">
                <i className="bi bi-bookmark"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <BackToTopButton />
    </>
  );
};
