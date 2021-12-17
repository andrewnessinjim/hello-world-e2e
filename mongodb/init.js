let DB_NAMESPACE = "helloworld";
db.createUser(
    {
        user: "hello-world-user",
        pwd: "hello-world-pass",
        roles: [
            {
                role: "readWrite",
                db: DB_NAMESPACE
            }
        ]
    }
)

db.auth("hello-world-user", "hello-world-pass");
let appDb = db.getSiblingDB(DB_NAMESPACE);

appDb.pages.insertOne({
    pageName: "homePage",
    heading: "Hello World!",
    toolSets: [{
            heading: "Source code in",
            tools: [{
                    logoKey : "typescript",
                    toolTip: ""
                },{
                    logoKey : "pug",
                    toolTip: ""
                },{
                    logoKey : "sass",
                    toolTip: ""
                },{
                    logoKey : "svg",
                    toolTip: ""
                }]
        },{
            heading: "Using",
            tools: [{
                    logoKey : "apollo",
                    toolTip: ""
                },{
                    logoKey : "express",
                    toolTip: ""
                },{
                    logoKey : "graphql",
                    toolTip: ""
                },{
                    logoKey : "reactjs",
                    toolTip: ""
                },{
                    logoKey : "mongodb",
                    toolTip: ""
                }]
        },{
            heading: "Transformed by",
            tools: [{
                    logoKey : "gulp",
                    toolTip: ""
                },{
                    logoKey : "webpack",
                    toolTip: ""
                },{
                    logoKey : "babel",
                    toolTip: ""
                }]
        },{
            heading: "Transformed into",
            tools: [{
                    logoKey : "html",
                    toolTip: ""
                },{
                    logoKey : "javascript",
                    toolTip: ""
                },{
                    logoKey : "css",
                    toolTip: ""
                }]
        },{
            heading: "Executed in",
            tools: [{
                    logoKey : "nodejs",
                    toolTip: ""
                },{
                    logoKey : "nodemon",
                    toolTip: ""
                },{
                    logoKey : "browsers",
                    toolTip: ""
                }]
        },{
            heading: "Packaged into",
            tools: [{
                    logoKey : "docker",
                    toolTip: ""
                }]
        },{
            heading: "Test cases in",
            tools: [{
                    logoKey : "jest",
                    toolTip: ""
                },{
                    logoKey : "cypress",
                    toolTip: ""
                }]
        },{
            heading: "Built, tested and deployed by",
            tools: [{
                    logoKey : "circleci",
                    toolTip: ""
                }
            ]
        },{
            heading: "Deployed to",
            tools: [{
                    logoKey : "heroku",
                    toolTip: ""
                }
            ]
        },{
            heading: "Dependencies managed by",
            tools: [{
                    logoKey : "npm",
                    toolTip: ""
                }
            ]
        },{
            heading: "Version controlled by",
            tools: [{
                    logoKey : "git",
                    toolTip: ""
                },{
                    logoKey : "github",
                    toolTip: ""
                }
            ]
        },{
            heading: "IDE used",
            tools: [{
                    logoKey : "vscode",
                    toolTip: ""
                }
            ]
        }
    ]
});