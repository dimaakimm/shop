import React, {useContext} from 'react';
import classes from "../Drawer/Drawer.module.css";
import CartContext from "../../context/CartContext";

const Info = ({title, description, img}) => {
    const {setIsDrawer} = useContext(CartContext)
    return (
        <div className={classes.emptyCart}>
            <img width={120} className='mb-10' src={img} alt="emptyCart"/>
            <h2>{title}</h2>
            <div className={classes.addedInfo}>{description}</div>
            <button className={classes.greenButton} onClick={() => setIsDrawer(false)}>
                <img className={classes.btnArrow} src='/img/arrow.svg' alt="Arrow"/>
                Вернуться назад
            </button>
        </div>
    );
};

export default Info;