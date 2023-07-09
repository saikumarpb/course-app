import { atom} from "recoil";


interface Auth {
    isLoggedin: boolean;
    username?: string;
    token: string | null
    role: 'admin' | 'user' | null;
    isLoading: boolean
}

export const authState = atom<Auth>({key: 'Auth', default: {
    isLoggedin: false,
    username: undefined,
    token: localStorage.getItem('token'),
    role: null,
    isLoading: false
}})