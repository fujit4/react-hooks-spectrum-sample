import React, { useReducer, useEffect } from 'react';
import './App.css';
import HookedHeader from "./HookedHeader";
import Movie from "./Movie";
import Search from "./Search";
import { Provider, defaultTheme, Flex, View, Text, Grid, repeat, Footer, ProgressCircle } from '@adobe/react-spectrum';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const colorSchemeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT_MODE":
      return {
        colorScheme: "light"
      };
    case "DARK_MODE":
      return {
        colorScheme: "dark"
      };
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [colorSchemeStete, colorSchemeDispatcher]
    = useReducer(colorSchemeReducer, { colorScheme: "light" })

    const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

  const searchMethod = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <Provider theme={defaultTheme} colorScheme={colorSchemeStete.colorScheme}>
      {/* 全体をflexbox化する */}
      {/* ダークモードでも白地が見えないように画面の高さ分をコンテンツ領域で確保する */}
      <Flex direction="column" gap="size-100" minHeight="100vh">

        {/* ヘッダー部 */}
        <HookedHeader text="HOOKED" />

        {/* 検索部 中央寄せにする*/}
        <Flex direction="row" justifyContent="center">
          <Search search={searchMethod} />
        </Flex>

        {/* ガイダンス部 中央寄せにする */}
        <Flex direction="row" justifyContent="center">
          <Text>Sharing a fwe of our favourite movies</Text>
        </Flex>

        {/* コンテンツ部 Grid化する */}
        <Grid
          columns={repeat('auto-fit', 'size-2400')}
          autoRows="size-2400"
          justifyContent="center"
          gap="size-200">
          {loading && !errorMessage ? (
            // ローディング表示
            <View
              // 上下中央表示
              alignSelf="center"
              // 左右中央表示（gridのrpeatを無視）
              justifySelf="center">
              <ProgressCircle aria-label="Loading…" isIndeterminate />
            </View>
          ) : errorMessage ? (
            // エラーメッセージ表示
            <View
              // 左右中央表示（gridのrpeatを無視）
              justifySelf="center">
              <div className="errorMessage">{errorMessage}</div>
            </View>
          ) : (
                // コンテンツ表示
                movies.map((movie, index) => (
                  <View
                    backgroundColor="gray-200">
                    <Movie key={`${index}-${movie.Title}`} movie={movie} />
                  </View>
                ))
              )}


        </Grid>
        <Footer alignSelf="center">
          <a href="https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/" target="_blank">
            freeCodeCamp：How to build a movie search app using React Hooks
          </a>
          <br/>
          <a href="https://react-spectrum.adobe.com/react-spectrum/index.html" target="_blank">
          React Spectrum：A React implementation of Spectrum, Adobe’s design system.
          </a>
        </Footer>
      </Flex>
    </Provider>
  );
};

export default App;
