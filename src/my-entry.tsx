import React from 'react';
import {
    Entry
} from "infrastructure-components";


import {
    GraphQLString
}  from 'graphql';


export const MY_ENTRY_ID = "my_entry";


export interface IMyEntry {
    pkey: string,
    skey: string,
    mydata: string
}

export default function MyEntry (props)  {
    return <Entry
        id={ MY_ENTRY_ID }
        primaryKey="pkey"
        rangeKey="skey"
        data={{
            mydata: GraphQLString, // the version of this entry
        }}
    />

};