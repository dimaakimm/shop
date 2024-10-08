import React, {useContext, useState} from 'react';
import classes from './Card.module.css'
import CartContext from "../../context/CartContext";
import 'macro-css'
import ItemsService from "../../API/ItemsService";
import ContentLoader from "react-content-loader"
const Card = ({title, price, primary, img, index, id, fetchCart, isOrder=false, isLoading=false,...props}) => {
    const {cartItems, setCartItems, favourites, setFavourites, items, setItems, checkIsItemAdded, checkIsItemLiked} = useContext(CartContext)
    const handleOnClickPlus = async (obj) => {
        try{
            if (cartItems.find(item => item.index === obj.index)){
                await ItemsService.deleteItemFromCart(index)
                setCartItems(cartItems.filter(item => item.index !== obj.index))

                setFavourites(favourites.map(item => {
                    if (item.index === obj.index){
                        return {...item, isAdded: false, isFavourite: obj.isFavourite}
                    }
                    return item;
                }))
                setItems(items.map(item => {
                    if (item.index === obj.index){
                        return {...item, isAdded: false, isFavourite: obj.isFavourite}
                    }
                    return item;
                }))
            }
            else{
                setCartItems(prev => [...prev, obj])
                await ItemsService.addItemToCart(obj)

                setFavourites(favourites.map(item => {
                    if (item.index === obj.index){
                        return {...item, isAdded: true, isFavourite: obj.isFavourite}
                    }
                    return item;
                }))
                setItems(items.map(item => {
                    if (item.index === obj.index){
                        return {...item, isAdded: true, isFavourite: obj.isFavourite}
                    }
                    return item;
                }))
            }
        }
        catch (e){
            alert(e)
        }

    }
    const handleOnClickLike = async (obj) => {
        try {
            if (favourites.find(fav => fav.index === obj.index)) {
                ItemsService.deleteFavourite(obj.index)

            } else {
                const {data} = await ItemsService.addItemToFavourite(obj)
                data.isAdded = obj.isAdded
                console.log(data)
                setFavourites(prev => [...prev, data])

            }
        }
        catch (e){
            alert(e)
        }
    }

    return (
        <div className={'mr-20 mb-30 '+ classes.card}>
            {isLoading ?
                <ContentLoader
                    speed={2}
                    width={155}
                    height={235}
                    viewBox="0 0 155 250"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="154" />
                    <rect x="0" y="161" rx="5" ry="5" width="155" height="15" />
                    <rect x="3" y="181" rx="5" ry="5" width="100" height="15" />
                    <rect x="6" y="220" rx="5" ry="5" width="80" height="35" />
                    <rect x="118" y="220" rx="5" ry="5" width="32" height="33" />
                </ContentLoader>
            :
                <>
                    {!isOrder &&
                        <div className={classes.favourite}>
                            <img className='cu-p'
                                 src={checkIsItemLiked(index) ? '/img/heart-liked.png' : "/img/heart-unliked.png"}
                                 alt="unlikedImg"
                                 onClick={() => handleOnClickLike({title, price, img, id, index,})}/>
                        </div>
                    }
                    <img width='100%' height={135} src={img} alt="img"/>
                    <h5>{title}</h5>
                    <div className={"d-flex justify-between align-center " + classes.bottom}>
                        <div className='cardBottom d-flex flex-column'>
                            <span className='text-uppercase'>Цена: </span>
                            <b>{Math.floor(price / 1000)} {price % 1000} руб.</b>
                        </div>
                        {!isOrder &&
                            <img className='cu-p'
                             onClick={() => handleOnClickPlus({title, price, img, id, index, })}
                             src={checkIsItemAdded(index) ? '/img/btn-checked.svg' : "/img/plus.jpg"} alt="plusImg"/>
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default Card;