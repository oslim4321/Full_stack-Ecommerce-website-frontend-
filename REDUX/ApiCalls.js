import { PublicRequest } from "../RequestMethod"
import { loginErr, loginStart, loginSuccess } from "./ProductsReduxSlice/UserLoginSlice"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await PublicRequest.post('user/Login', user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginErr(error))
    }
}


