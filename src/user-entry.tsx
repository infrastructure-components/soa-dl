import React from 'react';
import { Entry } from "infrastructure-components";
import { GraphQLString }  from 'graphql';

export const USER_ENTRY_ID = "user_entry";

export interface IUserEntry {
    username: string,
    userid: string,
    age: string,
    address: string
}

export default function UserEntry (props)  {
    return <Entry
        id={ USER_ENTRY_ID }
        primaryKey="username"
        rangeKey="userid"
        data={{
            age: GraphQLString,
            address: GraphQLString
        }}
    />

};