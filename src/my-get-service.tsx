import * as React from 'react';

import {
    callService,
    Middleware,
    select,
    Service,
    serviceWithDataLayer
} from "infrastructure-components";

import {IMyEntry, MY_ENTRY_ID} from './my-entry';

export const GET_SERVICE_ID = "getservice";

export async function callMyGetService (pkey: string, skey: string, onData: (myEntryData: IMyEntry) => void) {

    await callService(
        GET_SERVICE_ID,
        {
            pkey: pkey,
            skey: skey
        },
        async function (response: any) {
            console.log("received data: ", response);

            await response.json().then(function(data) {
                console.log(data[`get_${MY_ENTRY_ID}`]);
                onData(data[`get_${MY_ENTRY_ID}`]);
            });
        },
        (error) => {
            console.log("error: " , error)
        }
    );

}

export default function MyGetService () {
    return <Service
        id={ GET_SERVICE_ID }
        path="/mygetservice"
        method="GET">

        <Middleware
            callback={serviceWithDataLayer(async function (dataLayer, req, res, next) {

                console.log("this is the service: ", req.query);

                const data = await select(
                    dataLayer.client,
                    dataLayer.getEntryQuery(MY_ENTRY_ID, {
                        pkey: req.query.pkey,
                        skey: req.query.skey
                    })
                );

                res.status(200).set({
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                }).send(JSON.stringify(data));

            })}/>

    </Service>
}
