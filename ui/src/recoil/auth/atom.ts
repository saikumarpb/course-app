import { atom} from "recoil";


interface Auth {
    isLoggedin: boolean;
    username?: string;
}

export const authState = atom<Auth>({key: 'Auth', default: {
    isLoggedin: false,
    username: undefined
}})