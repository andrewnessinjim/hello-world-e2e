import "./main.scss"

import React from "react";
import ReactDOM from "react-dom";

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache
} from "@apollo/client";

import { useQuery, gql } from "@apollo/client";

const MESSAGE_QUERY = gql`
query {
    message
}
`
const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
})

const HelloMessage = () => {
    const {data} = useQuery(MESSAGE_QUERY);

    return (
        <p>
            {data && (
                <>
                    {data.message}
                </>
            )}
        </p>
    )
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <section>
            <h1>Hello World!</h1>
            <HelloMessage/>
        </section>
    </ApolloProvider>,
    document.getElementById("mount")
);