import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { GlobalDisplayAlert } from '../../Context/Alert';
import { GlobalUSerData } from '../../Context/ClientBuyCartInfo';
import Spinner from '../../PreLoader/Spinner';
import { UserRequest } from '../../RequestMethod';
import { v4 as uuidv4 } from 'uuid';
import { removeProdByid } from '../../REDUX/ProductsReduxSlice/AddToCart';
import { useDispatch } from 'react-redux'


function Checkout() {
    const randomID = Math.floor(Math.random() * 200)
    const dispatch = useDispatch()
    const { showAlert } = GlobalDisplayAlert()
    const { setInfo, } = GlobalUSerData()
    const cart = useSelector((state) => state.cart)
    const [stripeToken, setstripeToken] = useState(null)
    const [spinner, setspinner] = useState(false)
    const navigate = useNavigate()
    const [FinalTotal, setFinalTotal] = useState(0)
    const ApiKEy = 'pk_test_51LomMgH3FDIF4YxGBzCvGdK8ztMmTZDAscmiLZJnsDLhZyOy144w8G4a8WuDLNqRWgsAks8Xb41cWqSCU9yNdD8x00UgI6Ay5e'

    const onToken = (token) => {
        setspinner(true)
        setstripeToken(token)
    }

    /* delete cart by id */
    function RemoveCart(id) {
        // console.log()
        dispatch(removeProdByid(id))
    }



    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await UserRequest.post('/product/stripe', {
                    tokinId: stripeToken.id,
                    amount: AllFees * 100
                });
                if (res.data) {
                    setspinner(false)
                    setInfo(res.data)
                    navigate('/SuccessPayment',)
                } else {
                    navigate('/FailedPaymet')
                    setspinner(false)
                }
            } catch (error) {
                navigate('/FailedPaymet')

                setspinner(false)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, navigate])
    // console.log(cart)

    function CheckoutButt() {
        this.innerHTML = 'Loading...'
    }
    const { pathname } = useLocation()
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (!user) {
            showAlert(true, "red", 'Pls signup or login')
        } else {
            // console.log(user, 'from cart')
            showAlert(true, "green", `Hi ${user.username} you can checkout now`)
        }
    }, [pathname])

    /* fess  charger*/
    let tax = 10
    let shipping = 15;
    const [AllFees, setAllFees] = useState()

    useEffect(() => {
        setFinalTotal(cart.products.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0))
    }, [cart.products, pathname]
    )
    useEffect(() => {
        setAllFees(FinalTotal + tax + shipping)
    }, [FinalTotal])





    return (
        <div>
            {/* <!-- component --> */}
            <div className="flex items-center justify-center py-8">
                {/* <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ ---> */}
                <button className="py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white">Open Modal</button>
            </div>
            <div className="w-full h-full bg-white dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                {/* <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ ---> */}
                <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                    <div className="flex justify-between lg:flex-row flex-col md:px-10" id="cart">

                        <div className="mt-10 lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-y-hidden overflow-x-hidden lg:h-screen h-auto" id="scroll">
                            <p className="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">Your Cart</p>
                            {
                                !cart.products && <><p className='mt-10'> You dont have ani cart</p></>
                            }

                            {cart.products && cart.products.map((product) => {
                                const { quantity, categories, color, createdAt, desc, img, inStock, price, size, title, _id } = product
                                return (
                                    <div key={uuidv4()} className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                                        <div className="md:w-4/12 2xl:w-1/4 w-full">
                                            <img src={img} alt="Black Leather Bag" className="h-full object-center object-cover md:block hidden" />
                                            <img src={img} alt="Black Leather Bag" className="md:hidden w-full h-full object-center object-cover" />
                                        </div>
                                        <div className={`border-b border-${color}-500 py-4 md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center`}>
                                            <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">{_id.slice(3, 8)}</p>
                                            <div className="flex items-center justify-between w-full pt-1">
                                                <p className="text-base font-black leading-none text-gray-800 dark:text-white">{title}</p>
                                                <select aria-label="Select quantity" className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                                                    <option defaultChecked>{quantity}</option>
                                                    {
                                                        [...Array(4)].map((x, i) =>
                                                            <option value={i + 1} key={i + 1}>{i + 1}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2"><span className='font-bold'>size:</span> {size}</p>
                                            <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2"><span className='font-bold'>quantity:</span> {quantity}</p>
                                            <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2"><span className='font-bold'>each amount:</span>${price}</p>
                                            <div className="flex justify-between ">
                                                <p className="text-xs leading-3 text-gray-600 dark:text-white py-4"><span className='font-bold'>Color:</span>{color}</p>
                                                <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                                                    <span aria-hidden="true" className={`h-8 w-8 bg-${color} border border-black border-opacity-10 rounded-full`}></span>
                                                </label>

                                            </div>
                                            <p className="w-46 text-xs leading-3 text-gray-600 dark:text-white"><span className='font-bold'>Composition:</span> {desc}</p>
                                            <div className="flex items-center justify-between pt-5">
                                                <div className="flex itemms-center">
                                                    <p className="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">Add to favorites</p>
                                                    <p onClick={() => RemoveCart(_id)} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
                                                </div>
                                                <p className="text-base font-black leading-none text-gray-800 dark:text-white"><span className='text-sm'>total:</span> ${price * quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
                            <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                                <div>
                                    <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">Summary</p>
                                    <div className="flex items-center justify-between pt-16">
                                        <p className="text-base leading-none text-gray-800 dark:text-white">Subtotal</p>
                                        <p className="text-base leading-none text-gray-800 dark:text-white font-extrabold">${FinalTotal}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800 dark:text-white">Shipping</p>
                                        <p className="text-base leading-none text-gray-800 dark:text-white">${shipping}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800 dark:text-white">Tax</p>
                                        <p className="text-base leading-none text-gray-800 dark:text-white">${tax}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                        <p className="text-2xl leading-normal text-gray-800 dark:text-white">Total</p>
                                        <p className="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">$ {AllFees}</p>
                                    </div>
                                    {
                                        user ?

                                            <StripeCheckout
                                                name='Oslim cloths'
                                                image='/Images/yara-kawe.png'
                                                billingAddress
                                                shippingAddress
                                                description={`Your total is ${AllFees}`}
                                                amount={AllFees * 100}
                                                token={onToken}
                                                stripeKey={ApiKEy}
                                            >
                                                <button onClick={CheckoutButt} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">Checkout</button>
                                            </StripeCheckout>
                                            :
                                            <button disabled className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700 cursor-not-allowed">Pls SignUp before checking out</button>
                                    }

                                    {
                                        spinner && <div className='flex justify-center items-center'><Spinner /></div>
                                    }
                                    <h1>{uuidv4()}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Checkout