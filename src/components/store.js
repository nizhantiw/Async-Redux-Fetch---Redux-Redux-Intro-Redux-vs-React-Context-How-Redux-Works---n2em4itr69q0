import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "hot-news",
  initialState: {
    articlesNum: 0,
    articles: [],
  },
  reducers: {
    set(state, action) {
      //   console.log("function Callled");

      let temp = state.articles;
      state.articles = temp.concat(action.payload.articles);
      state.articlesNum = action.payload.num;

      // state.articles = action.payload.articles;
      // state.articlesNum = action.payload.articles.length;
      //   console.log(data.articles, "array");
      //   console.log("function executed");
    },
    setNum(state, action) {
      state.articlesNum = action.payload.num;
    },
  },
});

const store = configureStore({
  reducer: {
    hotNews: slice.reducer,
  },
});

// export const getData = (num) => {
//   return async function (dispatch) {
//     fetch(
//       "https://newsapi.org/v2/top-headlines?country=us&apiKey=1bece6d43f784fba8e45baca9e8040b1"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch(
//           slice.actions.setData({
//             articles: data.articles.slice(0, num),
//           })
//         );
//       });
//   };
// };

export default store;

export const actions = slice.actions;
