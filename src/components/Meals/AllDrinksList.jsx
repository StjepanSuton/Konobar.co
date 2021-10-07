import React from "react";
import { useState, useEffect } from "react";
import DrinksGroup from "./DrinksGroup";
import Box from "@mui/material/Box";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
export default function AllDrinksList() {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch(
        "https://konobarco-default-rtdb.europe-west1.firebasedatabase.app/Drinks.json"
      );
      const responseData = await response.json();
      const loadedDrinks = [];
      for (const key in responseData) {
        loadedDrinks.push({
          id: key,
          title: responseData[key].title,
          drinks: responseData[key].drinks,
          titleEng: responseData[key].titleEng,
          img: responseData[key].img,
        });
      }
      setDrinks(loadedDrinks);
      setIsLoading(false);
    };
    fetchDrinks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ p: 50 }}>
        <ClimbingBoxLoader loading={isLoading} size={50} />
      </Box>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  const drinkGroup = drinks.map((item, i) => (
    <DrinksGroup
      key={item.id}
      id={item.id}
      title={item.title}
      titleEng={item.titleEng}
      drinks={item.drinks}
      img={item.img}
      i={i}
    />
  ));
  return <Box sx={{ width: "100%", maxWidth: 750 }}>{drinkGroup}</Box>;
}
