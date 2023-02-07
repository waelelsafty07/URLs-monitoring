import Urls, { scheduleUrl } from "../../models/urls.models";

export const fetchUrl = async () => {
    const urls = await Urls.findAll();
    urls.forEach(async (element) => {
        try {
            scheduleUrl(element)
        } catch (err) {
            console.log("failed")
        }
    });

}