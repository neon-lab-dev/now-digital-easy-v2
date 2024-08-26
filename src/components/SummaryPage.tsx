import Image from 'next/image';
import { CART } from '@/assets';

const SummaryPage = () => (
    <div className="overflow-x-auto"> {/* Added responsive wrapping container */}
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white text-center whitespace-nowrap">
            <tr>
                <th className="px-4 py-4 text-xs md:text-sm lg:text-base font-bold text-black tracking-wider">
                    Product
                </th>
                <th className="px-4 py-4 text-xs md:text-sm lg:text-base font-bold text-black tracking-wider">
                    Duration
                </th>
                <th className="px-4 py-4 text-xs md:text-sm lg:text-base font-bold text-black tracking-wider">
                    Price
                </th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            <tr>
                <td className="flex items-center px-4 py-4 text-sm md:text-base lg:text-lg text-gray-800">
                    <Image src={CART.google} alt="Google Workspace" className="w-6 h-6 md:w-12 md:h-12 lg:w-12 lg:h-12" />
                    <div className="ml-2">
                        <h3 className="text-xs md:text-sm lg:text-base font-semibold">Google Workspace</h3>
                        <a href="#" className="text-blue-500 text-xs md:text-sm lg:text-base">thedesignerclub.com</a>
                    </div>
                </td>
                <td className="text-sm md:text-base lg:text-lg text-gray-800">
                    <div className="relative">
                        <select className="w-full h-10 border border-gray-300 text-sm md:text-base lg:text-lg text-gray-800 outline-none bg-white hover:bg-gray-50">
                            <option value="1">Annually</option>
                            <option value="2">Quarterly</option>
                            <option value="3">Half Yearly</option>
                            <option value="4">Monthly</option>
                        </select>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm md:text-base lg:text-lg text-gray-800">
                    <div className="flex items-center">
                        <p className="font-semibold pr-4">₹225.00</p>
                        <button className="text-red-500">
                            <svg xmlns="http:www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>

            <tr>
                <td className="flex items-center px-4 py-4 text-sm md:text-base lg:text-lg text-gray-800">
                    <Image src={CART.database} alt="Linux Hosting" className="w-6 h-6 md:w-12 md:h-12 lg:w-12 lg:h-12" />
                    <div className="ml-2">
                        <h3 className="text-xs md:text-sm lg:text-base font-semibold">Linux Hosting</h3>
                        <a href="#" className="text-blue-500 text-xs md:text-sm lg:text-base">iaaxin.com</a>
                    </div>
                </td>
                <td className="text-sm md:text-base lg:text-lg text-gray-800">
                    <div className="relative">
                        <select className="w-full h-10 border border-gray-300 text-sm md:text-base lg:text-lg text-gray-800 outline-none bg-white hover:bg-gray-50">
                            <option value="1">Annually</option>
                            <option value="2">Quarterly</option>
                            <option value="3">Half Yearly</option>
                            <option value="4">Monthly</option>
                        </select>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm md:text-base lg:text-lg text-gray-800">
                    <div className="flex items-center">
                        <p className="font-semibold pr-4">₹225.00</p>
                        <button className="text-red-500">
                            <svg xmlns="http:www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>

            <tr>
                <td className="flex items-center px-4 py-4 text-sm md:text-base lg:text-lg text-gray-800">
                    <Image src={CART.www} alt="uinstitute.in" className="w-6 h-6 md:w-12 md:h-12 lg:w-12 lg:h-12" />
                    <div className="ml-2">
                        <h3 className="text-xs md:text-sm lg:text-base font-semibold">uinstitute.in</h3>
                        <a href="#" className="text-blue-500 text-xs md:text-sm lg:text-base">.IN Domain Registration</a>
                    </div>
                </td>
                <td className="text-sm md:text-base lg:text-lg text-gray-800">
                    <div className="relative">
                        <select className="w-full h-10 border border-gray-300 text-sm md:text-base lg:text-lg text-gray-800 outline-none bg-white hover:bg-gray-50">
                            <option value="1">Annually</option>
                            <option value="2">Quarterly</option>
                            <option value="3">Half Yearly</option>
                            <option value="4">Monthly</option>
                        </select>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm md:text-base lg:text-lg text-gray-800">
                    <div className="flex items-center">
                        <p className="font-semibold pr-4">₹225.00</p>
                        <button className="text-red-500">
                            <svg xmlns="http:www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>
)

export default SummaryPage;