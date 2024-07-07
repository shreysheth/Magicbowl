import axios from "axios";
import { useState, useEffect } from "react";
import BackToTopButton from "../components/backToTop";
import { Home } from "./home";
export const Chefs = () => {
  const [chefs, setChefs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedChef, setSelectedChef] = useState({
    _id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    profilePicture: "",
    role: "",
    isApproved: false,
    likedRecipes: [],
    savedRecipes: [],
    recipeCount: 0,
    recipes: [],
    subscribers: 0
  });
  // const [selectedRecipe, setSelectedRecipe] = useState({
  //   _id: "",
  //   name: "",
  //   url: "",
  //   description: "",
  //   author: "",
  //   isVegetarian: false,
  //   prepTime: {
  //     hours: 0,
  //     minutes: 0,
  //     _id: "",
  //   },
  //   cookTime: {
  //     hours: 0,
  //     minutes: 0,
  //     _id: "",
  //   },
  //   ingredients: [],
  //   method: [],
  //   likes: 0,
  //   saves: 0,
  //   image: "",
  // });
  const url = "http://localhost:5000/api/auth";

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get(`${url}/chefs`);
        setChefs(response.data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);

  const handleChefClick = async (id) => {
    try {
        const response = await axios.get(`${url}/chefs/${id}`);
        setSelectedChef(response.data);
        const recipeList = await axios.get(`${url}/chefs/${id}/recipes`);
        console.log(recipeList.data);
        setRecipes(recipeList.data);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
      <div className="container-fluid mt-3 mb-2">
        <div className="row row-cols g-2">
          {chefs.map((chef) => (
            <div key={chef._id} className="col mb-3 " style={{cursor: "default"}}>
              <div className="card h-100" style={{ width: "18rem" }}>
                <img src={chef.profilePicture} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h6 className="card-title mb-2 text-truncate" title={chef.name}>{chef.name}</h6>
                  <p className="card-subtitle mb-2 text-body-secondary">
                    {chef.recipeCount} recipes | {chef.subscribers} subscribers
                  </p>
                  <p className="card-text text-truncate" title={chef.description}>{chef.description}</p>
                  <button onClick={() => handleChefClick(chef._id)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chefModal"><i className="bi bi-info-circle"></i></button>
                  <button onClick={() => handleChefClick(chef._id)} className="btn btn-danger ms-2"><i className="bi bi-heart"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* chefModal */}
      <div
        className="modal fade"
        id="chefModal"
        tabIndex="-2"
        aria-labelledby="chefModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="chefModalLabel">
                {selectedChef.name}
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
                      src={selectedChef.profilePicture}
                      alt={`${selectedChef.name}`}
                    />
                  </div>
                  <div className="col-10">
                  <p className="card-subtitle mb-2 text-body-secondary">
                    {selectedChef.name}
                  </p>
                  <p className="card-subtitle mb-2 text-body-secondary">
                    {selectedChef.recipeCount} recipes | {selectedChef.subscribers} subscribers
                  </p>
                  </div>
                </div>
                <br />
                <div className="row">
                  <Home recipeList={recipes} />
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
