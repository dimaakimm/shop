import './App.css';
import 'macro-css'
import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import ItemsService from "./API/ItemsService";
import useFetching from "./hooks/useFetching";
import CartContext from "./context/CartContext";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter/AppRouter";

function App() {
    const arr = [1]
    console.log(arr.push(2))


    const [favourites, setFavourites] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [isDrawer, setIsDrawer] = useState(false)
    const [items, setItems] = useState([])
    const [fetchAllItems, isLoading, allError] = useFetching(async () => {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
            ItemsService.getAllCartItems(),
            ItemsService.getFavourites(),
            ItemsService.getAll(),
        ]);
        setCartItems(cartResponse.data);
        setFavourites(favoritesResponse.data.map(item1 => ({
            ...item1,
            isAdded: cartResponse.data.some(item2 => item2.index === item1.index)
        })))
        setItems(itemsResponse.data.map(item1 => ({
            ...item1,
            isLiked: favoritesResponse.data.some(item2 => item2.index === item1.index),
            isAdded: cartResponse.data.some(item2 => item2.index === item1.index)
        })))
    })
    useEffect(() => {
        fetchAllItems()
    }, []);

    const checkIsItemAdded = (index) => {
        return cartItems.some(item => item.index === index)
    }
    const checkIsItemLiked = (index) => {
        return favourites.some(item => item.index === index)
    }
  return (
      <CartContext.Provider value={{
          cartItems: cartItems,
          setCartItems: setCartItems,
          favourites: favourites,
          setFavourites: setFavourites,
          isDrawer: isDrawer,
          setIsDrawer: setIsDrawer,
          items: items,
          setItems: setItems,
          isLoading: isLoading,
          checkIsItemAdded: checkIsItemAdded,
          checkIsItemLiked: checkIsItemLiked
      }}>
          <BrowserRouter>
              <Header />
              <Drawer isDrawer={isDrawer} setIsDrawer={setIsDrawer} items={cartItems}/>
              <AppRouter />
          </BrowserRouter>
      </CartContext.Provider>
  );
}

export default App;
