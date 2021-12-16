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
    toolSets {
      heading
      tools {
        logoKey
        toolTip
      }
    }
  }
}
`
const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
})

const HomePage = () => {
    const {data} = useQuery(HOMEPAGE_QUERY);
    return (
        <main>{data && (
            <>
                <Heading heading={data.homePage.heading}/>
                {data.homePage.toolSets
                .map((toolSet, index) => 
                    <ToolSet key={index} heading={toolSet.heading}/>
                )}
            </>
        )}
        </main>)
}
const Heading = (props) => {
    return <h1>{props.heading}</h1>
}

const ToolSet = (props) => {
    return (
        <section>
            <h2>{props.heading}</h2>
        </section>
    );
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <HomePage />
    </ApolloProvider>,
    document.getElementById("mount")
);