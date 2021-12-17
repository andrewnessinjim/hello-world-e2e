import "./main.scss"

import React from "react";
import ReactDOM from "react-dom";

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache
} from "@apollo/client";

import { useQuery, gql } from "@apollo/client";
import images from "./images/loadImages";

const HOMEPAGE_QUERY = gql`
query {
  homePage {
    heading
    toolSets {
      heading
      tools {
        logoKey
        toolTip
        logoHeightPx
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
                <div className="tool-sets-container">
                    {data.homePage.toolSets
                    .map((toolSet, index) => 
                        <ToolSet
                            key={index}
                            heading={toolSet.heading}
                            tools={toolSet.tools}/>
                    )}
                </div>
            </>
        )}
        </main>)
}
const Heading = (props) => {
    return <h1>{props.heading}</h1>
}

const ToolSet = (props) => {
    return (
        <section className="tool-set-container">
            <h2>{props.heading}</h2>
            <div className="logos-container">
                {props.tools.map((tool, index) =>
                    <img 
                        key={index}
                        src={images[tool.logoKey]}
                        height={tool.logoHeightPx? tool.logoHeightPx+"px": "32px"}
                        className="logo"/>)
                }
            </div>
            
        </section>
    );
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <HomePage />
    </ApolloProvider>,
    document.getElementById("mount")
);