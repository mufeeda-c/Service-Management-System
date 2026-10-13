


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { view_bill } from "../api/register";
import SideBar from "../components/SideBar";


export default function ViewBillCustomer() {
    const { serviceId } = useParams();

    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate=useNavigate()
    useEffect(() => {
        let active = true;
        async function getData() {
            try {
                const response = await view_bill(serviceId)
                if (active) {
                    setBill(response.data);
                }
            } catch (err) {
                if (active) {
                    setError(
                        err.response?.data?.error ||
                        "Unable to load the bill."
                    );
                }
            }
            finally {

                if (active) {
                    setLoading(false);
                }

            }
            return () => {
                active = false;
            };

        }
        getData()

    }, [serviceId]);
    const handlePrint = () => {
        window.print()
    }

    if (loading) {
        return <p className="p-6">Loading bill...</p>;
    }

    if (error) {
        return (
            <p className="m-6 rounded bg-red-100 p-4 text-red-700">
                {error}
            </p>
        );
    }

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">

            {/* Sidebar */}
            <div className="print:hidden shrink-0">
            
                <SideBar />
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
                            navigate(`/view-service/${serviceId}`)
                        }
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-lg transition"
                    >
                        ← Back to Service Request
                    </button>
                </div>

                {/* bill container */}
                <div className="rounded-xl bg-white p-5 shadow print:shadow-none print:border-0 print:p-0">
                    <h2 className="mb-4 text-2xl font-bold">
                        Service Bill
                    </h2>

                    <p>Bill ID: {bill.id}</p>
                    <p>Service ID: {bill.service_id}</p>
                    <p>
                        Date: {new Date(bill.created_at).toLocaleString()}
                    </p>

                    <div className="mt-5 overflow-x-auto">
                        <table className="w-full min-w-[500px] text-left">
                            <thead>
                                <tr className="border-b bg-gray-100">
                                    <th className="p-3">Description</th>
                                    <th className="p-3">Quantity</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bill.items.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="p-3">{item.description}</td>
                                        <td className="p-3">{item.quantity}</td>
                                        <td className="p-3">
                                            ₹{Number(item.price).toFixed(2)}
                                        </td>
                                        <td className="p-3">
                                            ₹{Number(item.subtotal).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5 text-right text-xl font-bold">
                        Total: ₹{Number(bill.total_amount).toFixed(2)}
                    </div>
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="bg-green-600 hover:bg-green-700 text-white print:hidden font-semibold px-5 py-3 rounded-lg transition"
                    >
                        Print / Save as PDF
                    </button>
                </div>
            </main>
        </div>
    );
}
