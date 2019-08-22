import * as React from 'react';
import "@babel/polyfill";
import {
    DataLayer,
    Environment,
    Middleware,
    Route,
    ServiceOrientedApp
} from "infrastructure-components";

import UserEntry, { USER_ENTRY_ID } from './user-entry';
import DataForm from './data-form';
import GetUserService from './get-user-service';
import AddUserService from './add-user-service';

export default (
    <ServiceOrientedApp
        stackName = "soa-dl"
        buildPath = 'build'
        region='eu-west-1'>

        <Environment name="dev" />

        <Route
            path='/'
            name='My Service-Oriented React App'
            render={()=><DataForm />}
        />

        <DataLayer id="datalayer">

            <UserEntry />
            <GetUserService />
            <AddUserService />

        </DataLayer>

    </ServiceOrientedApp>
);