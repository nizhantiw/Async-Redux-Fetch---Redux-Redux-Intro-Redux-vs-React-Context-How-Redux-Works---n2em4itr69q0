import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./store";

const API_KEY = "1bece6d43f784fba8e45baca9e8040b1"; //Get your own api key from newsapi

const App = () => {
  const dispatch = useDispatch();
  const newsObj = useSelector((state) => state.hotNews);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=1bece6d43f784fba8e45baca9e8040b1"
    )
      .then((res) => res.json())
      .then((data) =>
        dispatch(actions.set({ articles: data.articles, num: 5 }))
      );
  }, []);

  const numChangeHandler = (e) => {
    dispatch(actions.setNum({ num: e.target.value }));
  };
  let articles = [...newsObj.articles];

  console.log(newsObj, "newobje");

  let filteredArticles = articles
    .sort(() => Math.random() - 0.5)
    .slice(0, newsObj.articlesNum);

  return (
    <div id="main">
      <h2>Top News Articles</h2>
      <div>
        <label htmlFor="num">Enter Number of articles</label>
        <input
          type="number"
          id="num"
          onChange={numChangeHandler}
          min={1}
        ></input>
      </div>
      {newsObj.articlesNum !== 0 ? (
        <div>
          <h3>Top {newsObj.articlesNum} articles</h3>
          <ul id="articles">
            {filteredArticles.map((item) => {
              return (
                <li key={item.author}>
                  <div className="article">
                    Author: {item.author}
                    <h2>{item.title}</h2>
                    <img src={item.urlToImage}></img>
                    <p>
                      {item.content === null
                        ? "No Content for this article"
                        : item.content}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Please wait Loading...</p>
      )}
    </div>
  );
};

export default App;
