import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Spinner from '../../PreLoader/Spinner'
// import { PublicRequest } from '../../RequestMethod'

function Description() {
    const [Product, setProduct] = useState()
    const location = useLocation()
    const OneProd = location.pathname.split('/')[2]




    // c
    if (Product) {
        // const cate = Product.categories.replace(/,/g, '-')

        // console.log(cate)

    }
    return (
        <div>

            {
                Product ?
                    <div className="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
                        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                            <div className="md:flex items-center -mx-10">
                                <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                                    <div className="relative">
                                        <img src={Product.img} className="w-full relative z-10" alt="" />
                                        <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-10">
                                    <div className="mb-10">
                                        <p>categories:</p>
                                        <h1 className="font-bold uppercase text-2xl mb-5">{Product.categories.join('/').replace(/,/g, '/').split(',')} <br /> {Product.title}</h1>
                                        <p className="text-sm">{Product.desc} <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right"></i></a></p>
                                    </div>
                                    <div>
                                        <div className="inline-block align-bottom mr-5">
                                            <span className="text-2xl leading-none align-baseline">$</span>
                                            <span className="font-bold text-5xl leading-none align-baseline">{Product.price}</span>
                                            <span className="text-2xl leading-none align-baseline">.99</span>
                                        </div>
                                        <div className="inline-block align-bottom">
                                            {
                                                Product.inStock ?
                                                    <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW</button>
                                                    :
                                                    <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i className="mdi mdi-cart -ml-2 mr-2"></i>Not In Stock</button>

                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Spinner />
            }


        </div>
    )
}

export default Description