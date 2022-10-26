import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GlobalDisplayAlert } from '../../Context/Alert'
import Spinner from '../../PreLoader/Spinner'
import { addProduct } from '../../REDUX/ProductsReduxSlice/AddToCart'
import { PublicRequest } from '../../RequestMethod'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';


function ProductOverView({ setProdOverView, singleProductId, Product }) {
    const { showAlert } = GlobalDisplayAlert()
    const dispatch = useDispatch()
    // const [Product, setProduct] = useState()
    const [ErrorMess, setErrorMess] = useState('')
    const navigate = useNavigate()

    // useEffect(() => {
    //     const getProduct = async () => {
    //         try {
    //             const res = await PublicRequest.get(`/product/${singleProductId}`)
    //             setProduct(res.data)
    //             //   e.log(res.data)
    //         } catch (error) {
    //           
    //             setErrorMess(error.reponse.data)
    //         }
    //     }

    //     getProduct()
    // }, [])

    const [quantity, setquantity] = useState(1)
    const [size, setsize] = useState('')
    const [color, setcolor] = useState('')

    const AddToCart = (e) => {
        e.preventDefault()
        if (!size || !color) {
            showAlert(true, "red", 'color and size are required pick one')
        } else {
            dispatch(addProduct({ ...Product, quantity, size, color }))
            showAlert(true, "green", `Item Added To Cart Successfully`)
        }

    }

    // Product.size.map(({ size }) => console.log(size))
    return (
        <div className='mt-10 py-52 max-w-[200px]'>
            {
                Product ?

                    <div className="relative z-10" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">

                                <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div className=" mt-12 max-w-[100] relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <div onClick={() => setProdOverView(false)} >
                                            <button onClick={() => setProdOverView(false)} type="button" className="absolute top-10 right-4 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8 text-5xl text-red-700">
                                                {/* <span className="sr-only">Close</span> */}
                                                {/* <!-- Heroicon name: outline/x-mark --> */}
                                                <svg onClick={() => setProdOverView(false)} className="h-9 w-9 absolute right-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                            <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                                <img src={Product.img} alt="Two each of gray, white, and black shirts arranged on table." className="object-cover object-center" />
                                            </div>
                                            <div className="sm:col-span-8 lg:col-span-7">
                                                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{Product.title}</h2>
                                                <p>{Product.desc}</p>

                                                <section aria-labelledby="information-heading" className="mt-2">
                                                    <h3 id="information-heading" className="sr-only">Product information</h3>

                                                    <p className="text-2xl text-gray-900">${Product.price}</p>

                                                    {/* <!-- Reviews --> */}
                                                    <div className="mt-6">
                                                        <h4 className="sr-only">Reviews</h4>
                                                        <div className="flex items-center">
                                                            <div className="flex items-center">

                                                                {[...Array(4)].map((x, i) =>
                                                                    // <ObjectRow key={i} />
                                                                    <svg key={i} className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                                                                    </svg>
                                                                )}

                                                                {/* <!-- Heroicon name: mini/star --> */}
                                                                <svg className="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <p className="sr-only">3.9 out of 5 stars</p>
                                                            <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
                                                        </div>
                                                    </div>
                                                </section>

                                                <section aria-labelledby="options-heading" className="mt-10">
                                                    <h3 id="options-heading" className="sr-only">Product options</h3>

                                                    <form>
                                                        {/* <!-- Colors --> */}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-900">Color</h4>

                                                            <fieldset className="mt-4">
                                                                <legend className="sr-only">Choose a color</legend>
                                                                <span className="flex items-center space-x-3">
                                                                    {Product.color &&
                                                                        Product.color.map((color) => {
                                                                            return (
                                                                                <label key={uuidv4()} onClick={(e) => setcolor(color)} className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                                                                                    <input type="radio" name="color-choice" value="White" className="absolute w-2 h-2 left-3" aria-labelledby="color-choice-0-label" />
                                                                                    <span id="color-choice-0-label" className="sr-only">{color}</span>
                                                                                    <span aria-hidden="true" className={`h-8 w-8 bg-${color} border border-black border-opacity-10 rounded-full`}></span>
                                                                                </label>
                                                                            )
                                                                        })
                                                                    }
                                                                </span>
                                                            </fieldset>
                                                        </div>

                                                        {/* <!-- Sizes --> */}
                                                        <div className="mt-10">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-sm font-medium text-gray-900">Size</h4>
                                                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                                                            </div>

                                                            <fieldset className="mt-4">
                                                                <legend className="sr-only">Choose a size</legend>
                                                                <div className="grid grid-cols-4 gap-4">
                                                                    {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                                                                    {Product.size &&
                                                                        Product.size.map(({ size }) => (
                                                                            size.map((elem) => (
                                                                                <label key={uuidv4()} onClick={() => setsize(size)} className="group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 bg-white shadow-sm text-gray-900 cursor-pointer ">
                                                                                    <input type="radio" name="size-choice" value={elem} className="absolute w-2 h-2 left-3" aria-labelledby="size-choice-0-label" />
                                                                                    <span aria-selected id="size-choice-0-label">{elem}</span>
                                                                                    <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                                                                </label>
                                                                            ))

                                                                        ))
                                                                    }
                                                                </div>
                                                            </fieldset>
                                                        </div>

                                                        {/* Quantity selection bpx */}
                                                        <div className="max-w-2xl mx-auto">
                                                            <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select quantity </label>
                                                            <select onClick={(e) => setquantity(Number(e.target.value))} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                {[...Array(4)].map((x, i) =>
                                                                    <option value={i + 1} key={i + 1} >{i + 1}</option>
                                                                )}
                                                            </select>


                                                        </div>


                                                        {Product.inStock ? <button onClick={AddToCart} className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button>
                                                            : <button disabled className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Not In Stock</button>}
                                                    </form>
                                                </section>
                                                <p className='text-red-600 text-center'>{ErrorMess}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Spinner />
            }
        </div>
    )
}

export default ProductOverView