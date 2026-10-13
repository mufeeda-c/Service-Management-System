
import React, { useEffect, useState } from 'react'
import SideBarTechnician from '../components/SideBarTechnician'
import { useNavigate, useParams } from 'react-router-dom'
import { create_bill, view_bill } from '../api/register'

const CreateBill = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [billExist,SetBillExist]=useState(false)

    useEffect(() => {
        SetBillExist(false)
        async function getData() {
            const response = await view_bill(id)
            console.log("useEffect", response)
            if(response?.success){
                SetBillExist(true)
                navigate(`/view-bill/${id}`)
            }
        }
        getData()
    }, [])

    const [items, setItems] = useState([
        {
            id: Date.now(),
            description: 'Service Fee',
            quantity: 1,
            price: 100
        }
    ])

    const [billCreated, setBillCreated] = useState(false)

    // Add a new bill item
    const addItem = () => {
        setItems(prev => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                description: '',
                quantity: 1,
                price: 0
            }
        ])
        setBillCreated(false)
    }

    // Update an item
    const updateItem = (itemId, field, value) => {
        setItems(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, [field]: value }
                    : item
            )
        )
        setBillCreated(false)
    }

    // Remove an item
    const removeItem = (itemId) => {
        setItems(prev => prev.filter(item => item.id !== itemId))
        setBillCreated(false)
    }

    // Calculate total
    const totalAmount = items.reduce(
        (total, item) =>
            total + Number(item.quantity) * Number(item.price),
        0
    )

    // Currency formatting
    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount)

    // Validate and prepare bill
    const handleCreateBill = async () => {
        if (items.length === 0) {
            alert('Please add at least one bill item.')
            return
        }

        const invalidItem = items.some(item =>
            !item.description.trim() ||
            Number(item.quantity) <= 0 ||
            !Number.isFinite(Number(item.quantity)) ||
            !Number.isFinite(Number(item.price)) ||
            Number(item.price) < 0
        )

        if (invalidItem) {
            alert('Please enter valid descriptions, quantities and prices.')
            return
        }
        try {
            const result = await create_bill(id, items)
            alert(result.data.message ? result.data.message : result.data.error)

        } catch (error) {
            console.error(error.response?.data || error)
            alert('Failed to save bill')

        }
        setBillCreated(true)

    }

    // Print the bill
    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">

            {/* Sidebar */}
            <div className="print:hidden shrink-0">
                <SideBarTechnician />
            </div>

            {/* Main content */}
            <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4 mb-6 print:hidden">
                    {/* <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Create Bill
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Prepare the bill for your service request.
                        </p>
                    </div> */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/view-service-technician/${id}`)
                        }
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-lg transition"
                    >
                        ← Back to Job
                    </button>
                </div>

                {/* Bill container */}
                <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 print:shadow-none print:border-0 print:p-0">

                    {/* Bill heading */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 border-b pb-5 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                SERVICE BILL
                            </h2>
                            <p className="text-sm text-gray-500 mt-2">
                                Service Request ID: #{id}
                            </p>
                        </div>

                        <div className="sm:text-right">
                            <p className="text-sm text-gray-500">Bill Date</p>
                            <p className="font-semibold text-gray-800">
                                {new Date().toLocaleDateString('en-IN')}
                            </p>
                        </div>
                    </div>

                    {/* Bill items */}
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Bill Items
                            </h3>

                            <button
                                type="button"
                                onClick={addItem}
                                className="print:hidden bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                            >
                                + Add Item
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 text-sm">
                                        <th className="text-left p-3 ">Description</th>
                                        <th className="text-center p-3  w-24">Quantity</th>
                                        <th className="text-right p-3  w-36">Price (₹)</th>
                                        <th className="text-right p-3  w-36">Subtotal</th>
                                        <th className="p-3 print:hidden w-20">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} className="text-sm">
                                            <td className="p-2 ">
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            item.id,
                                                            'description',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter description"
                                                    className="w-full min-w-36 p-2  border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none print:hidden"
                                                />
                                                <span className="hidden print:inline">
                                                    {item.description}
                                                </span>
                                            </td>

                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    step="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            item.id,
                                                            'quantity',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full p-2 rounded-md text-center focus:ring-2 focus:ring-blue-400 outline-none print:hidden"
                                                />
                                                <span className="hidden print:inline">
                                                    {item.quantity}
                                                </span>
                                            </td>

                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.price}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            item.id,
                                                            'price',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full p-2  rounded-md text-right focus:ring-2 focus:ring-blue-400 outline-none print:hidden"
                                                />
                                                <span className="hidden print:inline">
                                                    {formatCurrency(Number(item.price) || 0)}
                                                </span>
                                            </td>

                                            <td className="p-3  text-right font-medium whitespace-nowrap">
                                                {formatCurrency(
                                                    (Number(item.quantity) || 0) *
                                                    (Number(item.price) || 0)
                                                )}
                                            </td>

                                            <td className="p-2 text-center print:hidden">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:bg-red-50 px-2 py-1 rounded"
                                                    title="Remove item"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {items.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="p-8 text-center text-gray-500 "
                                            >
                                                No items added. Click Add Item to begin.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-end border-t pt-5">
                        <div className="w-full sm:w-80 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Total Items</span>
                                <span>
                                    {items.reduce(
                                        (sum, item) =>
                                            sum + (Number(item.quantity) || 0),
                                        0
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-t pt-4">
                                <span className="text-lg font-bold text-gray-800">
                                    Total Amount
                                </span>
                                <span className="text-2xl font-bold text-blue-700">
                                    {formatCurrency(totalAmount)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t mt-8 pt-5">
                        <p className="text-sm text-gray-500">
                            Thank you for choosing our service.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
                        {!billCreated && (
                            <button
                                type="button"
                                onClick={handleCreateBill}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition"
                            >
                                Create Bill
                            </button>
                        )}

                        {billCreated && (
                            <span className="text-green-700 font-medium self-center">
                                ✓ Bill prepared successfully
                            </span>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreateBill
