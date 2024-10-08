import React, {useContext, useEffect} from 'react';
import useFetching from "../hooks/useFetching";
import ItemsService from "../API/ItemsService";
import CartContext from "../context/CartContext";
import Card from "../components/Card/Card";

const Favourites = () => {
    const {favourites, setFavourites, cartItems} = useContext(CartContext)


    return (
        <div className="content p-40 clear">
            <div className="contentHeader d-flex justify-between align-center mb-40">
                <h1>Ваше избранное</h1>
            </div>
            <div className="allItems d-flex flex-wrap ">
                {favourites.map((item, index) => (<Card
                        key={index}
                        img={item.img}
                        title={item.title}
                        isLiked={item.isLiked}
                        price={item.price}
                        initialIsLiked={true}
                        initialIsAdded={item.isAdded}
                        id={item.id}
                        index={item.index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favourites;