import { useEffect, useState } from "react";

function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }

        const meals = await response.json();
        setLoadedMeals(meals);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []);

  if (isLoading) {
    return <p>กำลังโหลด</p>;
  }

  if (error) {
    return <p>พบปัญหาในการดึงข้อมูล</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id} className="meal-item">
          <img src={`http://localhost:3000/${meal.image}`} alt={meal.image} />
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default Meals;
