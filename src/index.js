import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import App from "./App";
import {store} from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import {setProducts} from "./store/slices/product-slice";
import products from "./data/products.json";
import "animate.css";
import "swiper/swiper-bundle.min.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import "./i18n";
import {MainItem} from "./components/mainContext/mainContext";
import axios from "axios";

// axios
//   .get(`theme.json`)
//   .then((res) => {
//     console.log("theme etest: ", res.data);
//     store.dispatch(setProducts(products));
//   })
//   .catch((err) => {
//     console.log("err: ", err);
//   });

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistProvider>
      <MainItem>
        <App />
      </MainItem>
    </PersistProvider>
  </Provider>
);
