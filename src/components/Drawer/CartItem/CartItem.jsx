import React, {useContext} from 'react';
import classes from './CartItem.module.css'
import CartContext from "../../../context/CartContext";
import ItemsService from "../../../API/ItemsService";
const CartItem = ({title, price, img, index, id, isAdded, isFavourite, ...props}) => {
    const {cartItems, setCartItems, setFavourites, setItems, favourites, items} = useContext(CartContext)
    const onClickDelete = async (obj) => {
        try{
            await ItemsService.deleteItemFromCart(obj.index)
            setCartItems(cartItems.filter(item => item.index !== obj.index))
            setFavourites(favourites.map(item => {
                if (item.index === obj.index){
                    return {...item, isAdded: false}
                }
                return item;
            }))
            const res = items.map(item => {
                if (item.index === obj.index){
                    console.log(item)
                    console.log(obj)
                    return {...item, isAdded: false, isFavourite: obj.isFavourite}
                }
                return item;
            })
            console.log(items)
            console.log(res)
            console.log(items===res)
            setItems(res)
        }
        catch (e){
            alert(e)
        }
    }
    return (
        <div className={"d-flex align-center " + classes.cartItem}>
            <div className={classes.cartItemImg}
                 style={{backgroundImage: 'url(' + img + ')'}}></div>
            <div className='mr-20 flex'>
                <p className='mb-5'>{title}</p>
                <b>{Math.floor(price/1000)} {price%1000} руб.</b>
            </div>
            <img onClick={()=>onClickDelete({title, price, img, index, id})} className='removeBtn cu-p' src="/img/btn-remove.jpg" alt="remove"/>
        </div>
    );
};

export default CartItem;