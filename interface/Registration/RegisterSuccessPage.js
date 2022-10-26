import React from 'react'
import { Link } from 'react-router-dom'

function RegisterSuccess() {
  return (
    <div className='flex justify-center items-center flex-col h-[100%] py-7'>
      <h1>Acount Succesful resgiser You can now login</h1>
      <Link to='/Login'><button className='btn btn-success'>Go to login</button></Link>
    </div>
  )
}

export default RegisterSuccess