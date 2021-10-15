import React from "react";
import { useState, useEffect } from "react";
import DrinksGroup from "./DrinksGroup";
import { Box } from "@mui/material/";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useSelector } from "react-redux";
import SearchTab from "../UI/SearchTab";

const akoJeLoginTruePica = {
  drinks: {
    p15: {
      id: "z1p15",
      mjera: "šalica",
      mjeraEng: "cup",
      price: 11,
      title: "Kava MIX",
      titleEng: "Coffee with cream and milk - large",
    },
    p16: {
      id: "z1p16",
      mjera: "šalica",
      mjeraEng: "cup",
      price: 10,
      title: "Cappuccino",
      titleEng: "Cappuccino",
    },
  },
  id: "z1",
  img: "https://image.freepik.com/free-vector/set-drinks-beverages-icon_18591-190.jpg",
  title: "Najcesca pica",
  titleEng: "Commonly orderd",
};

export default function AllDrinksList() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch(
        "https://konobar-co-default-rtdb.europe-west1.firebasedatabase.app//Drinks.json"
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
      if (isLoggedIn === true || isLoggedIn === "true") {
        loadedDrinks.unshift(akoJeLoginTruePica);
        setDrinks(loadedDrinks);
        setIsLoading(false);
      } else {
        setDrinks(loadedDrinks);
        setIsLoading(false);
      }
    };
    fetchDrinks().catch((error) => {
      console.log(error);
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <Box sx={{ p: 35 }}>
        <ClimbingBoxLoader loading={isLoading} size={60} />
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

  return (
    <div style={{ width: "100%" }}>
      <SearchTab drinks={drinks} />
      <Box sx={{ width: "100%", maxWidth: 750 }}>{drinkGroup}</Box>;
    </div>
  );
}
