import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GlobalDisplayAlert } from '../../Context/Alert'
import { UserRequest } from '../../RequestMethod'
import ProductCategory from './ProductCategory'
import ProductListClient from './ProductListClient'

function Home() {
    const { showAlert } = GlobalDisplayAlert()
    const navigate = useNavigate()
    function showal() {
        showAlert(true, "green", 'Login Successful')
    }

    const { pathname } = useLocation()

    // const res = await UserRequest.get(`order/${user._id}`)
    // useEffect(() => {
    //     const user = (JSON.parse(localStorage.getItem('user')));
    //     console.log(user)
    //     console.log(pathname)
    //     try {
    //         if (user) {
    //             const LogoutUserIfTokenNotValid = async () => {
    //                 const res = await UserRequest.get(`order/${user._id}`)
    //                 console.log(res)
    //             }
    //             LogoutUserIfTokenNotValid()
    //         }
    //     } catch (error) {
    //         alert('pls login')
    //         localStorage.removeItem('user');
    //         navigate('/Login')
    //     }

    // }, [])

    return (
        <div>
            <div className="w-full">
                <div className="flex bg-white" style={{ height: '600px' }}>
                    <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">Build Your New <span className="text-indigo-600">Idea</span></h2>
                            <p className="mt-2 text-sm text-gray-500 md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates. Cumque debitis dignissimos id quam vel!</p>
                            <div className="flex justify-center lg:justify-start mt-6">
                                <Link to='/product/All'><div className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800" >Get Started</div></Link>
                                <div onClick={showal} className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" >Learn More</div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:w-1/2" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%" }}>
                        <div className="h-full object-cover" style={{ backgroundImage: "url(https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg" }}>
                            <div className="h-full bg-black opacity-25"></div>
                        </div>
                    </div>

                </div>
                <p className='text-center'>Choose Items by category </p>

            </div>

            <ProductCategory />
            <ProductListClient />
        </div>
    )
}

export default Home