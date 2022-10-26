
import { Link } from 'react-router-dom'
import { categories } from '../../data'

function ProductCategory() {

    return (
        <div>

            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <div className='flex justify-between'>
                            <h2 className="text-2xl font-bold text-gray-900">Category</h2>
                            <h2 className="text-sm font-bold text-gray-900">
                                Filter Items Category
                            </h2>
                        </div>
                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {
                                categories.map((elem) => {
                                    return (
                                        <Link key={elem.id} to={`/product/${elem.category}`}>
                                            <div className="group relative">
                                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                                    <img src={elem.img} className="h-full w-full object-cover object-center" />
                                                </div>
                                                <h3 className="mt-6 text-sm text-gray-500">
                                                    <div href="#">
                                                        <span className="absolute inset-0 uppercase"></span>
                                                        {elem.category}
                                                    </div>
                                                </h3>
                                                <p className="text-base font-semibold text-gray-900">{elem.title}</p>
                                            </div>
                                        </Link>

                                    )
                                })
                            }

                            {/* <div className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                    <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg" alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant." className="h-full w-full object-cover object-center" />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <a href="#">
                                        <span className="absolute inset-0"></span>
                                        Self-Improvement
                                    </a>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">Journals and note-taking</p>
                            </div> */}

                            {/* <div className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                    <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg" alt="Collection of four insulated travel bottles on wooden shelf." className="h-full w-full object-cover object-center" />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <a href="#">
                                        <span className="absolute inset-0"></span>
                                        Travel
                                    </a>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">Daily commute essentials</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductCategory