import axios from "axios";
import { useState, useEffect } from "react";
import BackToTopButton from "../components/backToTop";
export const Chefs = () => {
  const [chefs, setChefs] = useState([]);
  const [selectedChefId, setSelectedChefId] = useState(null);
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

  const handleChefClick = (id) => {
    try {
        console.log(id);
        console.log(selectedChefId);
        setSelectedChefId(id);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
      <div className="container-fluid mt-3 mb-2">
        <div className="row row-cols-1 row-cols-md-6 g-2">
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
                  <button onClick={() => handleChefClick(chef._id)} className="btn btn-primary">Open Recipes</button>
                  <button onClick={() => handleChefClick(chef._id)} className="btn btn-primary ms-2"><i className="bi bi-heart"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BackToTopButton />
    </>
  );
};
