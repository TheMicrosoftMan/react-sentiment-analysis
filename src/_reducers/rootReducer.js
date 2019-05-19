import {combineReducers} from "redux";
import {analysis} from "./analysis.reducer";
import {text} from "./text.reducer";

export default combineReducers({
    analysis,
    text
});