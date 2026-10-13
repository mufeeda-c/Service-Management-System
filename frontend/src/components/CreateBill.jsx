
import { useEffect, useState } from "react";
import {create_bill} from "../api/register";
export default function CreateBill({ serviceId }) {

    const [items, setItems] = useState([emptyItem()]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [savedBill, setSavedBill] = useState(null);


    const updateItem = (index, field, value) => {
        setItems((previous) =>
            previous.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const addItem = () => {
        setItems((previous) => [...previous, emptyItem()]);
    };

    const removeItem = (index) => {
        setItems((previous) =>
            previous.filter((_, i) => i !== index)
        );
    };

    const getSubtotal = (item) => {
        const quantity = Number(item.quantity);
        const price = Number(item.price);

        if (
            !Number.isSafeInteger(quantity) ||
            quantity < 1 ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            return 0;
        }

        return Math.round(quantity * price * 100) / 100;
    };

    const totalAmount = items.reduce(
        (total, item) => total + getSubtotal(item),
        0
    );

    const formatCurrency = (amount) =>
        `₹${amount.toFixed(2)}`;

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");
        setSavedBill(null);

        if (!serviceId) {
            setError("Service ID is missing.");
            return;
        }

        if (items.length === 0) {
            setError("Add at least one bill item.");
            return;
        }

        for (const item of items) {
            const quantity = Number(item.quantity);
            const price = Number(item.price);

            if (!item.description.trim()) {
                setError("Enter a description for every item.");
                return;
            }

            if (!Number.isSafeInteger(quantity) || quantity < 1) {
                setError("Quantity must be a positive whole number.");
                return;
            }

            if (
                item.price === "" ||
                !Number.isFinite(price) ||
                price < 0 ||
                Math.round(price * 100) !== price * 100
            ) {
                setError("Enter a valid price with up to 2 decimal places.");
                return;
            }
        }

        setLoading(true);

        try {
            const response = await create_bill(serviceId, items);
            setSavedBill(response.data.bill);
            setSuccess(response.data.message);
        } catch (err) {
            const data = err.response?.data;

            setError(
                data?.error ||
                (data?.items
                    ? JSON.stringify(data.items)
                    : "Unable to save the bill.")
            );
        } finally {
            setLoading(false);
        }
    };

    if (savedBill) {
        return (
            <BillDetails bill={savedBill} />
        );
    }

    return (
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-4 shadow sm:p-6">
            <h2 className="mb-2 text-2xl font-bold">
                Create Service Bill
            </h2>

            <p className="mb-6 text-gray-600">
                Service ID: {serviceId}
            </p>

            {error && (
                <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
                    {error}
                </p>
            )}

            {success && (
                <p className="mb-4 rounded bg-green-100 p-3 text-green-700">
                    {success}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">
                        Bill Items
                    </h3>

                    <button
                        type="button"
                        onClick={addItem}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        + Add Item
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse text-left">
                        <thead>
                            <tr className="border-b bg-gray-100">
                                <th className="p-3">Description</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Price (₹)</th>
                                <th className="p-3">Subtotal</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b"
                                >
                                    <td className="p-2">
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter description"
                                            maxLength={255}
                                            required
                                            className="w-full rounded border p-2"
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            type="number"
                                            min="1"
                                            step="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="w-24 rounded border p-2"
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={item.price}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "price",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="0.00"
                                            required
                                            className="w-28 rounded border p-2"
                                        />
                                    </td>

                                    <td className="p-3 font-semibold">
                                        {formatCurrency(getSubtotal(item))}
                                    </td>

                                    <td className="p-2">
                                        <button
                                            type="button"
                                            disabled={items.length === 1}
                                            onClick={() => removeItem(index)}
                                            className="text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <div className="w-full rounded-lg bg-gray-50 p-4 sm:w-80">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Amount</span>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50 sm:w-auto"
                >
                    {loading ? "Saving Bill..." : "Save Bill"}
                </button>
            </form>
        </div>
    );
}

function BillDetails({ bill }) {
    return (
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-4 shadow sm:p-6">
            <h2 className="mb-4 text-2xl font-bold">
                Bill Saved Successfully
            </h2>

            <div className="mb-5 space-y-2">
                <p>Bill ID: {bill.id}</p>
                <p>Service ID: {bill.service_id}</p>
                <p>
                    Created At:{" "}
                    {new Date(bill.created_at).toLocaleString()}
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[550px] border-collapse text-left">
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

            <p className="mt-5 text-right text-xl font-bold">
                Total: ₹{Number(bill.total_amount).toFixed(2)}
            </p>
        </div>
    );
}
