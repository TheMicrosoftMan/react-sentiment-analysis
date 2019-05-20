import axios from "axios";
import { languagesConstants } from "../_constants";

export function getTranslate(text) {
    return axios.get(`https://api.mymemory.translated.net/get?q=${text}&langpair=${languagesConstants.UK}|${languagesConstants.EN}`);
}