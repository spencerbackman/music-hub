import axios from "axios";

const initialState = {
    user: {
        username: "",
        isAdmin: false
    },
    authErrCode: {
        signup: "",
        login: ""
    },
    isAuthenticated: false,
    loading: true
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case "AUTHENTICATE":
            return {
                ...state,
                ...action.user,
                isAuthenticated: true,
                authErrCode: initialState.authErrCode,
                loading: false
            }
        case "AUTH_ERROR":
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                },
                loading: false,
            }
        case "LOGOUT": 
            return {
                ...initialState,
                loading: false
            }
        default: 
            return state;
    }
};

export function authenticate(user) {
    return {
        type: "AUTHENTICATE",
        user
    }
}

export function signup(userInfo) {
    return dispatch => {
        axios.post("/auth/signup", userInfo)
            .then(response => {
                const {token, user} = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(authenticate(user))
            }).catch(err => {
                console.dir(err);
                dispatch(authError("signup", err.response.data.message));
            });
    };
};

export function login(credentials) {
    return dispatch => {
        axios.post("/auth/login", credentials)
            .then(response => {
                const {token, user} = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(authenticate(user))
            }).catch(err => {
                console.dir(err);
                dispatch(authError("login", err.response.data.message));
            });
    };
};

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
        type: "LOGOUT"
    }
}

function authError(key, errCode) {
    return {
        type: "AUTH_ERROR",
        key,
        errCode
    };
};

let verifyAxios = axios.create();
verifyAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export function verify() {
    return dispatch => {
        verifyAxios.get("/profile")
            .then(response => {
                dispatch(authenticate(response.data.user))
            }).catch(err => {
                console.dir(err);
                dispatch(authError("verify", err.response.status));
            });
    }
}

