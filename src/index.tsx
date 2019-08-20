import * as React from 'react';
import "@babel/polyfill";
import {
    DataLayer,
    Environment,
    Middleware,
    Route,
    ServiceOrientedApp
} from "infrastructure-components";

import MyEntry, { MY_ENTRY_ID } from './my-entry';
import DataForm from './data-form';
import MyGetService from './my-get-service';
import MyPostService from './my-post-service';

/**
 * Required permissions:
 *
 "dynamodb:CreateTable",
 "dynamodb:DeleteTable",
 "dynamodb:DescribeTable",
 "dynamodb:DeleteItem",
 "dynamodb:GetItem",
 "dynamodb:PutItem",
 "dynamodb:Scan",
 "dynamodb:Query",
 */

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

            <MyEntry />
            <MyGetService />
            <MyPostService />

        </DataLayer>

    </ServiceOrientedApp>
);