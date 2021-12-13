import * as db from "./db";
async function getHomePageData(){
    const homePageDoc = await db.get().collection("pages").findOne({pageName: "homePage"});
    return homePageDoc;
}

export default {
    getHomePageData
}