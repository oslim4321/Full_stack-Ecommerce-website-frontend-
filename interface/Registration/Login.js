import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalDisplayAlert } from '../../Context/Alert'
import { login } from '../../REDUX/ApiCalls'
import { PublicRequest } from '../../RequestMethod'
import GetuserSpinner from './GetuserSpinner'

function Login() {
    const navigate = useNavigate()
    const { showAlert } = GlobalDisplayAlert()
    const [Email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [passwordErr, setpasswordErr] = useState()
    const [emailErr, setemailErr] = useState()
    const [user, setuser] = useState()
    const [error, seterror] = useState()
    // const { isFetching, error, currentUser } = useSelector((state) => state.user)
    const [errMess, seterrMess] = useState()
    const [loading, setloading] = useState(false)
    const handleLogin = async () => {
        setloading(true)
        setemailErr('')
        setpasswordErr('')
        seterrMess('')
        if (!Email || !password) {
            showAlert(true, "red", 'This fields are required')
            setloading(false)
        } else {
            try {
                const res = await PublicRequest.post('user/Login', { email: Email, password })
                setloading(false)
                if (res.data) navigate('/')
                setuser(res.data)

                localStorage.setItem('user', JSON.stringify(res.data))
            } catch (error) {
                console.log(error)
                seterrMess(error.message)
                setloading(false)
                seterror(error.response.data)
            }

            // window.location.reload(false)
        }


    }
    useEffect(() => {
        if (error) {
            setemailErr(error.email)
            setpasswordErr(error.password)
        }
    }, [error])
    // const user = JSON.parse(localStorage.getItem('user'));

    // useEffect(() => {
    //     if (user) {
    //         navigate('/')
    //     }
    // }, [currentUser, isFetching])


    return (
        <div>
            <div className='pt-5'>
                <div className="bg-grey-lighter min-h-screen flex flex-col ">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">log in</h1>

                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={Email}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email" />

                            <input
                                onChange={(e) => setpassword(e.target.value)}
                                value={password}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password" />

                            {
                                !loading ?
                                    <button
                                        onClick={handleLogin}
                                        type="submit"
                                        className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 bg-blue-400"
                                    >Login</button>
                                    :
                                    <button
                                        disabled
                                        type="submit"
                                        className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 bg-blue-400 cursor-not-allowed"
                                    ><GetuserSpinner /></button>


                            }

                            {error &&
                                <>
                                    <p className='text-red-400'>{passwordErr}</p>
                                    <p className='text-red-400'>{emailErr}</p>
                                    {/* <p className='text-red-400'>{error.message}</p> */}
                                </>
                            }


                            <div className="text-center text-sm text-grey-dark mt-4">
                                By signing up, you agree to the
                                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                    Terms of Service
                                </a> and
                                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                    Privacy Policy
                                </a>
                            </div>
                        </div>
                        <p className='text-red-600'>{errMess}</p>

                        <div className="text-grey-dark mt-6">
                            Already have an account?
                            <Link to='/Signup'>
                                <a className="no-underline border-b border-blue text-blue-600">
                                    Sign Up
                                </a>.
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login