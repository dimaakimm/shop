import React, {useContext, useEffect, useState} from 'react';
import classes from './Drawer.module.css'
import CartItem from "./CartItem/CartItem";
import Info from "../Info/Info";
import CartContext from "../../context/CartContext";
import ItemsService from "../../API/ItemsService";
const Drawer = ({isDrawer, setIsDrawer, items, ...props}) => {
    const [cartTotalPrice, setCartTotalPrice] = useState(0)
    const [cartTotalTax, setCartTotalTax] = useState(0)
    const [isOrderCompleted, setIsOrderCompleted] = useState(false)
    useEffect(() => {
        const sum = items.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0)
        setCartTotalPrice(sum)
        setCartTotalTax(sum*0.05)
    }, [items]);
    const onClickOrder = () => {
        ItemsService.createOrder(items)
        console.log(items)
        ItemsService.clearCart(items)
        setIsOrderCompleted(true)
        setCartItems([])
    }
    const {setCartItems} = useContext(CartContext)
    return (
        <div className={isDrawer ? classes.overlay : classes.overlayDisplayNone}>
            <div className={"d-flex flex-column " + classes.drawer}>
                <h2 className='mb-30 d-flex justify-between'>Корзина <img className='removeBtn cu-p' onClick={()=>setIsDrawer(false)}
                                                                          src="/img/btn-remove.jpg" alt="remove"/></h2>
                {items.length > 0 ?
                    <>
                        <div className={classes.items}>
                        {items.size ? <h1>Ваша карзина пуста!</h1> : items.map(
                            item => <CartItem
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                img={item.img}
                                price={item.price}
                                index={item.index}
                            />
                        )}
                        </div>
                        <div className={classes.cartTotalBlock}>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{cartTotalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{Math.floor(cartTotalTax)} руб.</b>
                                </li>
                            </ul>
                            <button onClick={() => onClickOrder(true)} className={classes.greenButton}>Оформить
                                заказ<img src="/img/arrow.svg" alt="Arrow"/></button>
                        </div>
                    </>
                    :
                    <Info img={isOrderCompleted ? '/img/orderCompleted.svg' : "/img/arrow.svg"} title={isOrderCompleted ? 'Заказ оформлен' : 'Корзина пустая'} description={isOrderCompleted ? 'Ваш заказ скоро будет передан курьерам' : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'} />
                }
            </div>
        </div>
    );
};

export default Drawer;