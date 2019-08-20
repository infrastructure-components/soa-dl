import React, { useState } from 'react';

import { select, withDataLayer, callService } from 'infrastructure-components';

import MyGetService, { callMyGetService } from './my-get-service';
import MyPostService, { callMyPostService } from './my-post-service';
import {IMyEntry} from "./my-entry";


export default function DataForm (props)  {

    const [pkey, setPrimary] = useState("");
    const [skey, setSecondary] = useState("");
    const [mydata, setMyData] = useState("");

    return <div>
        <div>
            Primary Key:
            <input value={pkey} onChange={event => setPrimary(event.target.value)}/>
        </div>

        <div>
            Secondary Key:
            <input value={skey} onChange={event => setSecondary(event.target.value)}/>
        </div>

        <div>
            My Data:
            <input value={mydata} onChange={event => setMyData(event.target.value)}/>
        </div>


        <button onClick={() => callMyPostService({
            pkey: pkey,
            skey: skey,
            mydata: mydata
        })}>Save</button>

        <button onClick={async function () {
            callMyGetService(pkey, skey, (data: IMyEntry)=> {
                setPrimary(data.pkey);
                setSecondary(data.skey);
                setMyData(data.mydata);
            })
        }
        }>Load</button>

        <button onClick={() =>{
            setPrimary("");
            setSecondary("");
            setMyData("");
        }}>Clear</button>

    </div>
};
