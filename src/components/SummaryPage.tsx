import Image, { StaticImageData } from 'next/image';
import { CART } from '@/assets';
import { useState, useEffect } from 'react';

interface CartItem {
    name: string;
    link: string;
    price?: { registerPrice: string }[]; // Adjust this based on your actual data structure
}

interface Product {
    name: string;
    link: string;
    img: StaticImageData; // Assuming you're using a static image
    price: string;
}

const SummaryPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch cart items from local storage
        const savedCart = localStorage.getItem('cart');
        const cartItems: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
        
        // Transform cart items to match your products structure
        const formattedProducts: Product[] = cartItems.map((item: CartItem) => ({
            name: item.name,
            link: item.link, // Assuming 'link' is part of your domain item
            img: CART.google, // Replace with appropriate image mapping if needed
            price: item.price ? `₹${item.price[0].registerPrice}` : "N/A",
        }));
        
        setProducts(formattedProducts);
    }, []);

    return (
        <div className="overflow-x-auto">
            {products.length === 0 ? (
                <div className="flex justify-center items-center h-64 text-center">
                    <p className="text-lg font-semibold text-gray-500">Your cart is empty.</p>
                </div>
            ) : (
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
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="flex items-center px-4 py-4 text-sm md:text-base lg:text-lg text-gray-800">
                                    <Image src={product.img} alt={product.name} className="w-6 h-6 md:w-12 md:h-12 lg:w-12 lg:h-12" />
                                    <div className="ml-2">
                                        <span className=' font-900'>Google Workspace</span>
                                        <h3 className="text-xs md:text-sm lg:text-base font-semibold">{product.name}</h3>
                                        <a href={product.link} className="text-blue-500 text-xs md:text-sm lg:text-base">{product.link}</a>
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
                                        <p className="font-semibold pr-4">{product.price}</p>
                                        <button className="text-red-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SummaryPage;
