import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../../PreLoader/Spinner'

function ProductListClient() {
    const [products, setproducts] = useState()

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3453/api/v1/Ecommerce/product')
                setproducts(res.data)
            }
            catch (error) {
                // seterrorMessage(error.message)
            }
        }
        getProducts()
    }, [])

    return (
        <div>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
                    {
                        products ? (
                            products.slice(0, 6).map((elem) => {
                                const { categories, color, createdAt, desc, img, inStock, price, size, title, _id } = elem
                                return (
                                    <div key={_id} className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                                        <div className="group relative">
                                            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                                <img src={img} alt={title} />
                                                {/* "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" */}
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                    <h3 className="text-sm text-gray-700">
                                                        <div>
                                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                                            {title}
                                                        </div>
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">{categories[0]}</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">{price}</p>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })

                        ) : <Spinner />
                    }

                </div>
            </div>

        </div>
    )
}

export default ProductListClient