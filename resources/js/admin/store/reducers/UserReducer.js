import * as UserTypes from '../actionTypes/UserTypes';

const initialState = {
    users: {},
    user: {
        id: "",
        name: "",
        email: "",
        password: "",
        is_admin: 0
    },
    success_message: "",
    error_message: "",
    validation_errors: {},
    list_spinner: false,
    create_update_spinner: false
};

const userReducer = function (state = initialState, action) {
    switch (action.type) {
        case UserTypes.SET_USER_DEFAULTS:
            return {
                ...state,
                user: { ...state.user },
                success_message: "",
                error_message: "",
                validation_errors: {},
                list_spinner: false,
                create_update_spinner: false
            };
        case UserTypes.LIST_USERS:
            return {
                ...state,
                list_spinner: true
            };
        case UserTypes.LIST_USERS_SUCCESS:
            return {
                ...state,
                users: action.data,
                list_spinner: false
            };
        case UserTypes.LIST_USERS_FAILURE:
            return {
                ...state,
                error_message: action.error,
                list_spinner: false
            };
        case UserTypes.CREATE_USERS:
            return {
                ...state,
                create_update_spinner: true
            };
        case UserTypes.CREATE_USERS_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                user: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: {}
            };
        case UserTypes.CREATE_USERS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };
        case UserTypes.SHOW_USER:
            return {
                ...state,
                create_update_spinner: true
            };
        case UserTypes.SHOW_USER_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                user: { ...action.data.data, password: "" }
            };
        case UserTypes.SHOW_USER_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message
            };
        case UserTypes.EDIT_USERS:
            return {
                ...state,
                create_update_spinner: true
            };
        case UserTypes.EDIT_USERS_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                user: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: {}
            };
        case UserTypes.EDIT_USERS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };
        case UserTypes.DELETE_USERS:
            return {
                ...state,
                list_spinner: true
            };
        case UserTypes.DELETE_USERS_SUCCESS:
            let users = state.users;
            users.data = state.users.data.filter(item => item.id != action.id);

            return {
                ...state,
                list_spinner: false,
                users: users,
                success_message: action.message,
                error_message: ''
            };
        case UserTypes.DELETE_USERS_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error.message,
                success_message: ''
            };
        case UserTypes.RESET_USER_FIELDS:
            return {
                ...state,
                user: {
                    id: "",
                    name: "",
                    email: "",
                    password: "",
                    is_admin: 0
                }
            };
        case UserTypes.HANDLE_USER_CHANGE:
            return handleChange(state, action);
        default:
            return state;
    }
};

/**
 * handle field change
 */
function handleChange(state, action) {
    if (action.field !== 'is_admin') {
        return {
            ...state,
            user: { ...state.user, [action.field]: action.data }
        };
    } else {
        let checked = state.user.is_admin;

        if (action.checked == true) {
            checked = 1;
        } else if (action.checked == false) {
            checked = 0;
        }

        return {
            ...state,
            user: { ...state.user, is_admin: checked }
        };
    }
}

export default userReducer;