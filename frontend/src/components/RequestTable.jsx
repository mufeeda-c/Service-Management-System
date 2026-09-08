import React from 'react'

const RequestTable = () => {
  return (
    <div>
                                <table className='w-full border border-gray-300 rounded-md text-left'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='border border-gray-300 p-2'>ID</th>
                                    <th className='border border-gray-300 p-2'>CATEGORY</th>
                                    <th className='hidden lg:table-cell border border-gray-300 p-2'>DESCRIPTION</th>
                                    <th className='border border-gray-300 p-2'>STATUS</th>
                                    <th className='border hidden lg:table-cell border-gray-300 p-2'>TECHNICIAN</th>
                                    <th className='border border-gray-300 p-2'>DATE</th>
                                    <th className='border border-gray-300 p-2'>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='border border-gray-300 p-2'>1</td>
                                    <td className='border border-gray-300 p-2'>Electrical</td>
                                    <td className='hidden lg:table-cell border border-gray-300 p-2'>Leaky faucet</td>
                                    <td className='border border-gray-300 p-2'> 
                                        <span className='text-blue-900 text-center pl-3 pr-3 rounded-xl bg-blue-200'>Pending</span>
                                    </td>
                                    <td className='border hidden lg:table-cell border-gray-300 p-2'>John Doe</td>
                                    <td className='border border-gray-300 p-2'>2023-10-01</td>
                                    <td className='border border-gray-300 p-2'>
                                        <button className='bg-blue-300 m-1 hover:bg-blue-900 hover:text-white text-blue-900 font-bold py-1 px-2 rounded'>
                                            View
                                        </button>
                                        <button className='bg-yellow-300 m-1 hover:bg-yellow-900 hover:text-white text-yellow-900 font-bold py-1 px-2 rounded'>
                                            Edit
                                        </button>
                                        <button className='bg-red-300 m-1 hover:bg-red-900 hover:text-white text-red-900 font-bold py-1 px-2 rounded'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                 
                            </tbody>
                        </table>

    </div>
  )
}

export default RequestTable