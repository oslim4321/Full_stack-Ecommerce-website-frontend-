import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { GlobalUSerData } from '../../../Context/ClientBuyCartInfo'
import Spinner from '../../../PreLoader/Spinner'
import { UserRequest } from '../../../RequestMethod'

function SuccessPayment() {
    const cart = useSelector((state) => state.cart)
    const { Info } = GlobalUSerData()
    const [OrderProdId, setOrderProdId] = useState()
    const [OrderProdquantity, setOrderProdquantity] = useState()
    const [error, seterror] = useState()
    const [userFinalInfo, setuserFinalInfo] = useState()

    // console.log(products._id)
    const { pathname } = useLocation()
    useEffect(() => {
        cart.products.map((elem) => {
            setOrderProdId(elem._id)
            setOrderProdquantity(elem.quantity)
        })

    }, [])
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const sendUserOrder = async () => {
            try {
                const res = await UserRequest.post('/order', {
                    userId: user._id,
                    product: [{
                        productId: OrderProdId,
                        quantity: OrderProdquantity
                    }
                    ],
                    amount: Info.amount,
                    address: Info.billing_details
                })
                setuserFinalInfo(res.data)
            } catch (error) {
                seterror(error.message)
            }
        }
        sendUserOrder()
    }, [pathname])
    return (


        <>
            {
                userFinalInfo ?

                    <div>
                        <div className='flex justify-center items-center flex-col h-[100vh]'>
                            <p className='bg-green-600 px-4 py-4 text-white text-2xl rounded-md'>Successful.</p>
                            <p className='text-center font-bold'>Hi {userFinalInfo.address.line1} Your payment is Successful Thanks for choosing Oslim Cloths</p>
                            <p>An email will be send to you </p>
                            {/* {
                                userFinalInfo.address.map((elem) => (
                                    <p>your product will be deliver to {elem.country} {elem.city}</p>
                                ))
                            } */}
                            <p>status : <span>{userFinalInfo.status}</span></p>
                            <p className='text-red-400'>{error}</p>
                        </div>
                    </div>
                    :
                    <Spinner />
            }
        </>
    )
}

export default SuccessPayment