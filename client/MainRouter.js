import React from 'react'
import { Router, Switch, Route } from "react-router-dom";
import MainLayout from './views/MainLayout'
import Home from './views/Home';
import Regions from './views/regions/Regions';
import Employees from './views/employees/Employees';
import AddEditDialog from './views/employees/AddEditDialog';


const MainRouter = () => {
  return (<>
    <MainLayout >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/region/" component={Regions} />
          <Route exact path="/emp/" component={Employees} />
          <Route exact path="/emp/add" component={AddEditDialog} />
        </Switch>
    </MainLayout>

  </>)
}

export default MainRouter
