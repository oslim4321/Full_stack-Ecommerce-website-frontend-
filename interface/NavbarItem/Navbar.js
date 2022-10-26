import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import CartLogo from './CartLogo'
import { NavbarItem, UnRegisterUser } from './Items'
import Notify from './Notify'

function Navbar() {
    // const { currentUser } = useSelector((state) => state.user)
    const { Quantity, products } = useSelector((state) => state.cart)
    // console.log(Quantity)
    const [hamburger, sethamburger] = useState(true)
    const [backToTop, setbackToTop] = useState()
    const [user, setuser] = useState()
    const { pathname } = useLocation()
    // console.log(pathname)

    useEffect(() => {
        setuser(JSON.parse(localStorage.getItem('user')));
    }, [pathname])

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let scrollHeight = window.pageYOffset;
            if (scrollHeight > 500) {
                setbackToTop(true)
            } else {
                setbackToTop(false)
            }
        })
    }, [])

    const backToTopButt = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    // console.log(currentUser)
    return (
        <div>

            <div className="flex flex-wrap fixed z-40 mb-6">
                <section className="relative mx-auto mb-12">

                    <nav className="flex justify-between bg-gray-900 text-white w-screen">
                        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                            <div className="text-3xl font-bold font-heading">
                                {/* <!-- <img className="h-9" src="logo.png" alt="logo"> --> */}

                            </div>
                            {
                                user ?
                                    <ul className={`${hamburger ? 'hidden' : 'block'} md:flex px-4 mx-auto font-semibold font-heading md:space-x-12 `}>
                                        {
                                            NavbarItem.map((elem) => (
                                                <Link key={elem.id} to={elem.url}><li className='hover:text-gray-200'>{elem.text}</li></Link>
                                            ))
                                        }
                                    </ul>
                                    :
                                    <ul className={`${hamburger ? 'hidden' : 'block'} md:flex justify-end items-end md:absolute  px-4 mx-auto font-semibold font-heading md:space-x-12 `}>
                                        {
                                            UnRegisterUser.map((elem) => (
                                                <Link key={elem.id} to={elem.url}><li className='hover:text-gray-200'>{elem.text}</li></Link>
                                            ))
                                        }
                                    </ul>
                            }
                            {hamburger && user && <>
                                <p>Hi {user.username}</p>
                                <Notify />
                            </>
                            }

                            {/* <div className="hidden flex-row xl:flex items-center md:flex md:space-x-3 items-center">
                                <a className="hover:text-gray-200" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </a>

                                <a className=" flex items-center hover:text-gray-200" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </a>

                            </div> */}



                        </div>
                        {
                            hamburger &&
                            <Link to='/checkout' className="xl:hidden flex mr-6 items-center" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="flex absolute -mt-5 ml-4">
                                    {
                                        products && <span className='text-2xl'>{products.length}</span>
                                    }

                                    {/* <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"> */}
                                    {/* <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"> */}
                                    {/* </span> */}
                                </span>
                            </Link>

                        }

                        <div onClick={() => sethamburger(!hamburger)} className="navbar-burger self-center mr-12 xl:hidden md:hidden" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                    </nav>

                </section>
            </div>
            <div className="absolute bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                        <div>
                            <Link to='/checkout'>
                                <div className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                                    <div className=" flex mr-6 items-center">
                                        {products && <CartLogo products={products.length} />}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {
                        backToTop &&
                        <div onClick={backToTopButt} className="flex items-start justify-start fixed bottom-0 left-0 mb-4 m-4 z-10">
                            <div>
                                <button className='bg-red-400 rounded-full w-16 h-16 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 mr-1 md:w-20 md:h-20'><i className="bi bi-arrow-up text-2xl text-white  hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 mr-1"></i></button>
                            </div>
                        </div>
                    }


                </div>
            </div>
        </div >
    )
}

export default Navbar