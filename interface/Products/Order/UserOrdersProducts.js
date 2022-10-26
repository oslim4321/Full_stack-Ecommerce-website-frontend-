import React, { useEffect, useState } from 'react'
import './order.css'
import { UserRequest } from '../../../RequestMethod'
import Spinner from '../../../PreLoader/Spinner'

function UserOrdersProducts() {
  const [Orders, setOrders] = useState()
  const [error, seterror] = useState()
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user._id)
  useEffect(() => {
    const getUserOrder = async () => {
      try {
        const res = await UserRequest.get(`order/${user._id}`)
        setOrders(res.data)
        console.table(res.data)
      } catch (error) {
        seterror(error.response.data)
      }
    }
    getUserOrder()
  }, [])
  // http://localhost:3453/api/v1/Ecommerce/order/63457987cc2a922ad820b2d5
  return (
    <div>
      <body class="flex items-center justify-center">
        <div class="container">
          <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead class="text-white">
              <tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th class="p-3 text-left">No1</th>
                <th class="p-3 text-left">img</th>
                <th class="p-3 text-left">name</th>
                <th class="p-3 text-left">price</th>
                <th class="p-3 text-left">status</th>
                <th class="p-3 text-left">Quantity</th>
                <th class="p-3 text-left" width="110px">info</th>
              </tr>

            </thead>

            {Orders ?
              Orders.map((elem, index) => {

                return (
                  <tbody class="flex-1 sm:flex-none">
                    <tr key={elem._id} class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 ">
                      <td class="border-grey-light border hover:bg-gray-100 p-3">{index + 1}</td>
                      <td class="border-grey-light border hover:bg-gray-100 p-3"><img className='h-10' src="./Images/Basic_cloth-removebg-preview.png" alt="" /></td>
                      <td class="border-grey-light border hover:bg-gray-100 p-3">{elem.address.name}</td>
                      <td class="border-grey-light border hover:bg-gray-100 p-3">{elem.amount}</td>
                      <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{elem.status}</td>
                      <td class="border-grey-light border hover:bg-gray-100 p-3 truncate"> </td>
                      <td class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">View Products</td>
                    </tr>
                  </tbody>
                )
              })
              :
              !error && <Spinner />
            }



          </table>
        </div>
      </body>
      {/* <p className='text-red-400'>{error}</p> */}

      <style>

      </style>
    </div>
  )
}

export default UserOrdersProducts