import React from 'react'

function FailedPaymet() {
  return (
    <div>
      <div className='flex justify-center items-center flex-col h-[100vh]'>
        <p className='bg-red-600 px-4 py-4 text-white text-2xl rounded-md'>Failed.</p>
        <p className='text-center font-bold'>Sorry Your payment was not successful</p>
        {/* <p>An email will be send to you </p> */}
      </div>
    </div>
  )
}

export default FailedPaymet