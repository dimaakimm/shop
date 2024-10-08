import React, {useEffect, useState} from 'react';
import useFetching from "../hooks/useFetching";
import ItemsService from "../API/ItemsService";
import Card from "../components/Card/Card";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [fetchOrders, isLoading, error] = useFetching(async ()=>{
        const {data} = await ItemsService.getAllOrders()
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
    })
    useEffect(() => {
        fetchOrders()
        console.log(orders)
    }, []);

    const renderItems = () => {
        const loadingArray = [...Array(10)]
        return (isLoading ? loadingArray.map(item => ({...item, initialIsLiked: true, initialIsAdded: false, index: 10})) : orders).map((item, index) => (<Card
            key={index}
            index={item.index}
            {...item}
            isLoading={isLoading}
            isOrder={true}
        />))
    }


    return (
        <div className="wrapper clear">
            <div className="content p-40">
                <div className="contentHeader d-flex justify-between align-center mb-40">
                    <h1 className=''>Ваши заказы</h1>
                </div>
                <div className="allItems d-flex flex-wrap ">
                    {renderItems()}
                </div>
            </div>
        </div>
    );
};

export default Orders;