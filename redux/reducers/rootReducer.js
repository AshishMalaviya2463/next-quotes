import { combineReducers } from "redux";
import { allQuotesReducer } from "./allQuoteReducer";
import { editQuoteReducer } from "./editQuoteReducer";
import { loadingReducer } from "./loadingReducer";
import { toastReducer } from "./toastReducer";
import { userQuotesReducer } from "./userQuotesReducer";

export const rootReducer = combineReducers( {
    toastData: toastReducer,
    loading: loadingReducer,
    userQuote: userQuotesReducer,
    allQuotes: allQuotesReducer,
    editQuoteData: editQuoteReducer
} )