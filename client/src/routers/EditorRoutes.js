import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Components/Dashboard/Editor/EditorHeader';
import SideBar from '../Components/Dashboard/Editor/SideBar';
import { isLoggedIn, getUser } from '../services/auth';
import { Redirect } from 'react-router-dom';
const EditorRoutes = ({ component: Component, ...rest }) => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };
    if (!isLoggedIn()) {
         return <Redirect to='editor-login' />
    }
    return (

        <Route {...rest} component={(props) => (
            <div id='editor-dashboard'>
                <SideBar open={open} toggleDrawer={toggleDrawer} />
                <Header open={open} user={getUser()} toggleDrawer={toggleDrawer} />
                <main style={{ padding: '30px', }}>
                    <Component {...props} />
                </main>
            </div>
        )} />
    )
}
export default EditorRoutes;
