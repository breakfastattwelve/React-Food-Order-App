import { useEffect, useState } from "react";
import MealItem from "./MealItem.jsx";

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
        <MealItem meal={meal} key={meal.id}/>
      ))}
    </ul>
  );
}

export default Meals;
