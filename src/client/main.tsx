import "./main.scss"

import React from "react";
import ReactDOM from "react-dom";

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache
} from "@apollo/client";

import { useQuery, gql } from "@apollo/client";


const HOMEPAGE_QUERY = gql`
query {
  homePage {
    heading
  }
}
`
const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
})

const SiteHeading = () => {
    const {data} = useQuery(HOMEPAGE_QUERY);

    return (
        <h1>
            {data && (
                <>
                    {data.homePage.heading}
                </>
            )}
        </h1>
    )
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <section>
            <SiteHeading/>
        </section>
    </ApolloProvider>,
    document.getElementById("mount")
);