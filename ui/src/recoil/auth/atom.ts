import { atom} from "recoil";


interface Auth {
    isLoggedin: boolean;
    username?: string;
    token?: string
}

export const authState = atom<Auth>({key: 'Auth', default: {
    isLoggedin: typeof localStorage.getItem('token') === "string",
    username: undefined,
    token: localStorage.getItem('token') || undefined
}})