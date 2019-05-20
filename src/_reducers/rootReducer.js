import {combineReducers} from "redux";
import {analysis} from "./analysis.reducer";
import {text} from "./text.reducer";
import {translate} from "./translate.reducer";

export default combineReducers({
    analysis,
    text,
    translate
});