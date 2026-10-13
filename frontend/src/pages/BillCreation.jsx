import React from 'react'
import SideBarTechnician from '../components/SideBarTechnician'
import { useParams } from 'react-router-dom'
import CreateBill from '../components/CreateBill'

const BillCreation = () => {
    const { serviceId } = useParams();

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">

            {/* Sidebar */}
            <div className="print:hidden shrink-0">
                <SideBarTechnician />
            </div>

            {/* Main content */}
            <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <CreateBill serviceId={serviceId} />
            </main>


        </div>
    )
}

export default BillCreation