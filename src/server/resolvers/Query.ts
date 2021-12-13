import homepage from "../dao/homepage";

async function message() {
    const {message} = await homepage.getHomePageData();
    return message;
}

export default {
    message
}