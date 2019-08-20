import * as React from 'react';
import {
    callService,
    Middleware,
    mutate,
    Service,
    serviceWithDataLayer
} from "infrastructure-components";

import { MY_ENTRY_ID, IMyEntry } from './my-entry';

const POST_SERVICE_ID = "postservice";

export async function callMyPostService (myEntryData: IMyEntry) {

    await callService(
        POST_SERVICE_ID,
        myEntryData,
        (data: any) => {
            console.log("received data: ", data);

        },
        (error) => {
            console.log("error: " , error)
        }
    );

};

export default function MyPostService () {

    return <Service
        id={ POST_SERVICE_ID }
        path="/mypostservice"
        method="POST">

        <Middleware
            callback={serviceWithDataLayer(async function (dataLayer, req, res, next) {

                const parsedBody = JSON.parse(req.body);

                console.log("This is the data we got: ", parsedBody);

                await mutate(
                    dataLayer.client,
                    dataLayer.setEntryMutation(MY_ENTRY_ID, parsedBody)
                );

                res.status(200).set({
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                }).send("ok");

            })}/>

    </Service>
};