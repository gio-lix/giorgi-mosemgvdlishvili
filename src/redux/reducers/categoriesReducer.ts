import {
     ActionType,
    CATEGORIES_TYPES,
    CategoriesType,
} from "../types";
import {actionsCategories} from "../action-creators";


const initialState = {
    loading: false,
    categories: null as CategoriesType[] | null,
    error: ''
}
type StateType = typeof initialState
type Action = ActionType<typeof actionsCategories>

export const CategoriesReducer = (state: StateType = initialState, action: Action) => {

    switch (action.type) {
        case CATEGORIES_TYPES.CATEGORIES_FETCH_REQUEST:
            return {...state, loading: true}
        case CATEGORIES_TYPES.CATEGORIES_FETCH_SUCCESS:
            return {...state, categories: action.payload.categories, loading: false}
        case CATEGORIES_TYPES.CATEGORIES_FETCH_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}