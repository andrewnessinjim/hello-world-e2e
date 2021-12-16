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
    sections: [{
            heading: "Source code in",
            logos: [{
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
            logos: [{
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
            logos: [{
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
            logos: [{
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
            logos: [{
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
            logos: [{
                    logoKey : "docker",
                    toolTip: ""
                }]
        },{
            heading: "Test cases in",
            logos: [{
                    logoKey : "jest",
                    toolTip: ""
                },{
                    logoKey : "cypress",
                    toolTip: ""
                }]
        },{
            heading: "Automatically built, tested and deployed by",
            logos: [{
                    logoKey : "docker",
                    toolTip: ""
                }
            ]
        },{
            heading: "Deployed to",
            logos: [{
                    logoKey : "heroku",
                    toolTip: ""
                }
            ]
        },{
            heading: "Dependencies managed by",
            logos: [{
                    logoKey : "npm",
                    toolTip: ""
                }
            ]
        },{
            heading: "Version controlled by",
            logos: [{
                    logoKey : "git",
                    toolTip: ""
                },{
                    logoKey : "github",
                    toolTip: ""
                }
            ]
        },{
            heading: "IDE used",
            logos: [{
                    logoKey : "vscode",
                    toolTip: ""
                }
            ]
        }
    ]
});