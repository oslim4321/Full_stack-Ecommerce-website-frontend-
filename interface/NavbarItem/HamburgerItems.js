import React from 'react'
import { Link } from 'react-router-dom'
import { NavbarItem, UnRegisterUser } from './Items'

function HamburgerItems({ hamburger, sethamburger, currentUser }) {
    return (
        <div>
            {
                currentUser ?
                    <ul className={`${hamburger ? 'hidden' : 'block'} md:flex px-4 mx-auto font-semibold font-heading md:space-x-12 `}>
                        {
                            NavbarItem.map((elem) => (
                                <Link key={elem.id} to={elem.url}><li onClick={() => sethamburger(!hamburger)} className='hover:text-gray-200'>{elem.text}</li></Link>
                            ))
                        }
                    </ul>
                    :
                    <ul className={`${hamburger ? 'hidden' : 'block'} md:flex justify-end items-end md:absolute  px-4 mx-auto font-semibold font-heading md:space-x-12 `}>
                        {
                            UnRegisterUser.map((elem) => (
                                <Link key={elem.id} to={elem.url}><li onClick={() => sethamburger(!hamburger)} className='hover:text-gray-200'>{elem.text}</li></Link>
                            ))
                        }
                    </ul>
            }
        </div>
    )
}

export default HamburgerItems