import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalDisplayAlert } from '../../Context/Alert'
import { Register } from '../../REDUX/ApiCalls'
import { PublicRequest } from '../../RequestMethod'
import GetuserSpinner from './GetuserSpinner'
import RegisterSuccessPage from './RegisterSuccessPage'

function SignUp() {
    const navigate = useNavigate()
    const { showAlert } = GlobalDisplayAlert()
    const dispatch = useDispatch()
    const [username, setusername] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [Confirm_password, setConfirm_password] = useState()
    const [pop, setpop] = useState(false)
    const [loading, setloading] = useState(false)

    /* Errors */
    const [err, seterr] = useState()
    const [userNameErr, setuserNameErr] = useState("")
    const [emailErr, setemailErr] = useState("")
    const [passwordErr, setpasswordErr] = useState("")

    const RegisterUser = async () => {
        setloading(true)
        seterr('');
        setuserNameErr('');
        setemailErr('');
        setpasswordErr('')
        try {
            if (password != Confirm_password || password.length < 2) {
                setpasswordErr('sorry input  a valid password')
                showAlert(true, "red", 'sorry check your password')
                setloading(false)
                return
            } else {
                if (username, email, password) {
                    const res = await PublicRequest.post('user/Register', { username, email, password })
                    setloading(false)
                    if (res.data) {
                        setpop(true)
                    }

                } else {
                    showAlert(true, "red", 'Those field are required pls fill all the form')
                    setloading(false)
                }
            }
        } catch (error) {

            setloading(false)
            seterr(error.response.data);
        }
    }
    useEffect(() => {
        if (err) {
            setuserNameErr(err.username);
            setemailErr(err.email);
        }
    }, [err])

    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (user) navigate('/')
    }, [user])

    return (

        <div className='pt-5'>

            {pop &&
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-slate-100 shadow-md">
                    <RegisterSuccessPage />
                </div>
            }


            <div className="bg-grey-lighter min-h-screen flex flex-col ">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input
                            onChange={(e) => setusername(e.target.value)}
                            value={username}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded "
                            name="username"
                            placeholder="Username" />
                        <p className='mb-4 text-red-500'>{userNameErr}</p>
                        <input
                            onChange={(e) => setemail(e.target.value)}
                            value={email}
                            type="email"
                            className="block border border-grey-light w-full p-3 rounded"
                            name="email"
                            placeholder="Email" />
                        <p className='mb-4 text-red-500'>{emailErr}</p>
                        <input
                            onChange={(e) => setpassword(e.target.value)}
                            value={password}
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded"
                            name="password"
                            placeholder="Password" />
                        <p className='mb-4 text-red-500'>{passwordErr}</p>
                        <input
                            onChange={(e) => setConfirm_password(e.target.value)}
                            value={Confirm_password}
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password" />
                        <p className='mb-4 text-red-500'>{passwordErr}</p>
                        {
                            loading ?
                                <button
                                    disabled
                                    type="submit"
                                    className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 bg-blue-400 cursor-not-allowed"
                                ><GetuserSpinner /></button>
                                :
                                <button
                                    onClick={RegisterUser}
                                    type="submit"
                                    className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 bg-blue-400"
                                >Create Account</button>
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


                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <Link to='/Login'>
                            <a className="no-underline border-b border-blue text-blue-600">
                                Log in
                            </a>.
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp