import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../../PreLoader/Spinner'
import GetuserSpinner from '../Registration/GetuserSpinner'
import ProductOverView from './ProductOverView'
import { format } from 'timeago.js'
import { v4 as uuidv4 } from 'uuid';


function ProductCard({ seterrorMessage, filters, sorting, cat, errorMessage, setgetProdCatego }) {
    const [product, setproduct] = useState()
    const [FilteredProducts, setFilteredProducts] = useState()
    const [ProdOverView, setProdOverView] = useState(false)
    const [singleProductId, setsingleProductId] = useState()
    const dispatch = useDispatch()
    const [AddCartState, setAddCartState] = useState('Add To Cart')
    /* Product sendin down to pop over  */
    const [Product, setProduct] = useState()

    // const AddCartState = 'Add To Cart'

    useEffect(() => {
        const getProducts = async () => {
            try {
                if (cat === 'All') {
                    const res = await axios.get(`https://react-node-ecommerce-oslim.herokuapp.com/api/v1/Ecommerce/product`)
                    setproduct(res.data)
                    setgetProdCatego(res.data)
                } else {
                    const res = await axios.get(`https://react-node-ecommerce-oslim.herokuapp.com/api/v1/Ecommerce/product?category=${cat}`)
                    setproduct(res.data)
                }


            }
            catch (error) {
                seterrorMessage(error.message)
            }
        }
        getProducts()
    }, [cat])



    useEffect(() => {
        product && cat && setFilteredProducts(
            product.filter(item => Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
            )
            )
        )

    }, [filters, cat, product])


    useEffect(() => {
        if (FilteredProducts) {
            if ((sorting === 'newest')) {
                setFilteredProducts([...FilteredProducts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
            }
            else if ((sorting === 'oldest')) {
                setFilteredProducts([...FilteredProducts].sort((a, b) => a.createdAt.localeCompare(b.createdAt)))
            }
            else if ((sorting === 'asc')) {
                setFilteredProducts([...FilteredProducts].sort((a, b) => a.price - b.price))
            }
            else {
                setFilteredProducts([...FilteredProducts].sort((a, b) => b.price - a.price))
            }
        }

    }, [sorting])
    // console.log(sorting)
    function popProdOverView(params) {
        const res = product.find((elem) => elem._id === params)
        setProduct(res)

        setProdOverView(true)
    }

    /* onClick={() => popProdOverView(_id)} */
    return (
        <div className='pt-10'>

            <div className="mt-10">{ProdOverView && <ProductOverView singleProductId={singleProductId} setProdOverView={setProdOverView} Product={Product} />}</div>

            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  place-items-center">
                {
                    FilteredProducts ? FilteredProducts.map((elem) => {
                        const { categories, color, createdAt, desc, img, inStock, price, size, title, _id } = elem
                        return (
                            <div key={uuidv4()} className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                                <img className="object-cover w-full rounded-md h-72 xl:h-80" src={img} alt="T-Shirt" />
                                <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200 uppercase">{title}</h4>
                                <p className="text-blue-500">${price}</p>
                                <p>{color.map((color) => color.replaceAll("/", ","))}</p>
                                {/* {color.replaceAll("/", ",")} */}
                                {/* {console.log(color)} */}
                                <p> {format(createdAt)}</p>

                                {
                                    inStock ?
                                        <button onClick={() => popProdOverView(_id)} className="z-auto flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                            </svg>
                                            <span className="mx-1">{AddCartState}</span>
                                        </button>
                                        :
                                        <button className="z-auto flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 cursor-not-allowed">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                            </svg>
                                            {/* <button disabled className="mx-1"></button> */}
                                            <span className="mx-1">Not in Stock</span>
                                        </button>

                                }

                            </div>
                        )
                    }) : errorMessage && <Spinner />
                }

            </div>
        </div>
    )
}

export default ProductCard