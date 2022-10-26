import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from './ProductCard'

function Products() {
    const location = useLocation()
    const cat = location.pathname.split('/')[2]
    const [filters, setfilters] = useState({})
    const [sort, setsort] = useState('newest')
    const [errorMessage, seterrorMessage] = useState()
    const [getProdCatego, setgetProdCatego] = useState('')
    const [category, setcategory] = useState()
    const [color, setcolor] = useState()
    const [size, setsize] = useState()
    const [viewCateList, setviewCateList] = useState(false)
    const [viewColorList, setviewColorList] = useState(false)

    const hadleFilter = (e) => {
        const value = e.target.value
        setfilters({
            ...filters,
            [e.target.name]: value
        })
    }

    /* filter product by category and color */
    let categoryArr = []
    let colorArr = []
    let sizeArr = []
    useEffect(() => {
        if (getProdCatego) {
            getProdCatego.map((prod) => {
                prod.categories.map((cat) => {
                    return categoryArr.push(cat)
                })
                prod.color.map((color) => {
                    return colorArr.push(color)
                })
                prod.size.map((color) => {
                    return sizeArr.push(color)
                })
            })
        }
    }, [getProdCatego])
    useEffect(() => {
        if (getProdCatego) {
            setcategory([...new Set(categoryArr)]);
            setcolor([...new Set(colorArr)]);
            setsize([...new Set(sizeArr)]);
            // console.log(size)
        }
    }, [getProdCatego])
    /* filter product by category and color end*/

    function colorListFilter(e) {
        setfilters({
            ...filters,
            [e.target.name]: e.target.innerHTML
        })
    }


    return (
        <div>

            <section className="bg-white dark:bg-gray-900 py-20">
                <div className="container px-6 py-8 mx-auto">
                    <div className="lg:flex lg:-mx-2">
                        <span className='text-xl uppercase border-b mb-4 -mt-5'>{cat}</span>
                        <p className='text-red-600 absolute -mt-12 lg-text-left xl:text-left'>{errorMessage && errorMessage}</p>
                        {/* <h1 className='py-2 text-2xl'>All Category Available</h1> */}
                        <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4 flex justify-between items-center md:flex xl:block">
                            {/* category implemrnt */}
                            <div>
                                <div className="">
                                    <h1 className='flex items-center'><span className='text-lg'>categoroies</span>:
                                        {!viewCateList && <i onClick={() => setviewCateList(true)} className="bi bi-eye-fill text-2xl pl-2"></i>}
                                        {viewCateList && <i onClick={() => setviewCateList(false)} className="bi bi-eye-slash-fill text-2xl pl-2"></i>}
                                    </h1>
                                </div>
                                {category && viewCateList &&
                                    category.map((cat) => (
                                        <a key={cat} className="block font-medium text-gray-500 dark:text-gray-300 hover:underline capitalize" value={cat}>{cat}</a>
                                    ))
                                }
                            </div>
                            {/* category implemrnt */}



                            {/* color implemrnt */}
                            <div>
                                <div className="">
                                    <h1 className='flex items-center'><span className='text-lg'>color</span>:
                                        {!viewColorList && <i onClick={() => setviewColorList(true)} className="bi bi-eye-fill text-2xl pl-2"></i>}
                                        {viewColorList && <i onClick={() => setviewColorList(false)} className="bi bi-eye-slash-fill text-2xl pl-2"></i>}
                                    </h1>
                                </div>
                                {category && viewColorList &&
                                    color.map((color) => (
                                        <a key={color} onClick={colorListFilter} name='color' className={`block font-medium text-${color}-500 dark:text-gray-300 hover:underline capitalize`}>{color}</a>
                                    ))
                                }
                            </div>
                            {/* color implemrnt end */}

                            {/* <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Jackets & Coats</a>
                                <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Hoodies</a>
                                <a href="#" className="block font-medium text-blue-600 dark:text-blue-500 hover:underline">T-shirts & Vests</a>
                                <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Shirts</a>
                                <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Blazers & Suits</a>
                                <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Jeans</a>
                                <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Trousers</a>
                                <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Shorts</a>
                                <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Underwear</a> */}
                        </div>

                        <div className="mt-6">
                            {/* reset product icon */}
                            {/* <i class="bi bi-arrow-clockwise"></i> */}
                            <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
                                {/* <p className="text-gray-500 dark:text-gray-300">6 Items</p> */}
                                <div>
                                    <p>Product filter:</p>
                                    <select name='color' onChange={hadleFilter} className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none p-2 mb-3 px-3">
                                        <option selected="true" disabled="disabled" value="#">color</option>
                                        {color &&
                                            color.map((color) => (
                                                <option key={color} value={color}>{color}</option>
                                            ))
                                        }
                                        {/*                                         
                                        <option value="black">black</option>
                                        <option value="white">white</option>
                                        <option value="green">green</option> */}
                                    </select>
                                    <select name='size' onChange={hadleFilter} className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none p-2 px-3">
                                        <option selected="true" disabled="disabled" value="#">size</option>
                                        <option value="s">S</option>
                                        <option value="m">M</option>
                                        <option value="l">L</option>
                                        <option value="xs">XS</option>
                                        <option value="xl">XL</option>
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-gray-500 dark:text-gray-300">Sort</p>
                                    <select onChange={(e) => setsort(e.target.value)} className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none p-2">
                                        <option value="newesthh">Sort Newest</option>
                                        <option value="newest">Newest</option>
                                        <option value="asc">price (lower)</option>
                                        <option value="desc">Price (expensive)</option>
                                        <option value="oldest">Oldest</option>
                                    </select>
                                </div>
                            </div>

                            <ProductCard setgetProdCatego={setgetProdCatego} errorMessage seterrorMessage={seterrorMessage} filters={filters} sorting={sort} cat={cat} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Products