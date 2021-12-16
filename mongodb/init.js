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
    heading: "Hello World!"
});