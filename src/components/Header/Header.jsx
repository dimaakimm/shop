import React, {useContext, useEffect, useState} from 'react';
import classes from './Header.module.css'
import CartContext from "../../context/CartContext";
import {Link} from "react-router-dom";
const Header = ({onClickCart, ...props}) => {
    const {isDrawer, setIsDrawer, cartItems} = useContext(CartContext)
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        const sum = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0)
        setTotalPrice(sum)
    }, [cartItems]);

    return (
        <header className={"d-flex justify-between p-40 clear " + classes.header}>
            <Link to={''}>
                <div className="headerLeft d-flex">
                    <img width={40} height={40} src="/img/logo.jpg" alt="logoImg" className="mr-15"/>
                    <div className="headerInfo">
                        <h3 className='text-uppercase'>React sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className='headerRight d-flex align-center'>
                <li className='mr-30 cu-p' onClick={()=>setIsDrawer(true)}>
                    <img width={18} height={18} src="/img/cart.jpg" alt="cartImg"/>
                    <strong className='ml-10'>{totalPrice} руб.</strong>
                </li>
                <li className='mr-20 cu-p'>
                    <Link to={'/favourites'}>
                        <img src="/img/favourites.svg" alt="favImg"/>
                        <span className='ml-5 mr-10'>Закладки</span>
                    </Link>
                </li>
                <li className='cu-p'>
                    <Link to={'/orders'}>
                        <img src="/img/user.svg" alt="favImg"/>
                        <span className='ml-5'>Профиль</span>
                    </Link>
                </li>
            </ul>
        </header>);
};

export default Header;