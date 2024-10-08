import React from 'react';
import {routes} from "../router/routes";
import {Route, Routes} from "react-router-dom";
import Main from "../pages/Main";
const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route=>(
                <Route
                    element={<route.element/>}
                    exact={route.exact}
                    path={route.path}
                    key={route.path}
                />))}
            <Route path="*" element={<Main/>} />
        </Routes>
    );
};

export default AppRouter;