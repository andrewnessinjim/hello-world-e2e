import homepage from "../dao/homepage";

async function homePage() {
    const homePage = await homepage.getHomePageData();
    return homePage;
}

export default {
    homePage: homePage
}