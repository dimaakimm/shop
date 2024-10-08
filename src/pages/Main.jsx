import React, {useContext, useEffect, useMemo, useState} from 'react';
import Card from "../components/Card/Card";
import CartContext from "../context/CartContext";


const Main = () => {
    const {cartItems, isLoading, items} = useContext(CartContext)
    const [query, setQuery] = useState('')
    const searchedItems = useMemo(()=>{
        return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, items])

    const renderItems = () => {
        const loadingArray = [...Array(10)]

        return (isLoading ? loadingArray.map(item => ({...item, initialIsLiked: true, initialIsAdded: false, index: 10})) : searchedItems).map((item, index) => (<Card
            key={index}
            index={item.index}
            {...item}
            isLoading={isLoading}
        />))
    }

    return (
        <div className="wrapper clear">
            <div className="content p-40">
                <div className="contentHeader d-flex justify-between align-center mb-40">
                    <h1 className=''>{query ? `Поиск по запросу: ${query}` : 'Все кроссовки'}</h1>
                    <div className="searchBlock">
                        <img src="/img/search.png" alt="searchImg"/>
                        {query && <img className='clearBtn cu-p' src="/img/btn-remove.jpg" alt="clear"
                                       onClick={() => setQuery('')}/>}
                        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text"
                               placeholder='Поиск...'/>
                    </div>
                </div>
                <div className="allItems d-flex flex-wrap ">
                    {renderItems()}
                </div>
            </div>
        </div>
    );
};

export default Main;