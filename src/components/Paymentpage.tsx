import Image from 'next/image';
import { CART } from '@/assets';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the types for the cart items and product
interface CartItem {
    name: string;
    link: string;
    price?: { registerPrice: string }[];
    domainName: string;
}

interface Product {
    name: string;
    link: string;
    img: string;
    price: string;
}

interface CartItems {
    subTotal?: string;
    gst?: {
        cgst?: { Amt: string };
        sgst?: { Amt: string };
    };
    Total?: string;
}

const PaymentPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItems>({});

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const token = window.localStorage.getItem('token');
        const fetchCartItems = async () => {
            let products: Product[] = [];

            if (token) {
                setIsLoading(true);
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };
                try {
                    const { data } = await axios.get("https://liveserver.nowdigitaleasy.com:5000/cart", { headers });
                    if (data) setCartItems(data);

                    products = data.products.map((item: CartItem) => ({
                        name: item.domainName,
                        link: item.link,
                        img: CART?.google,
                        price: item.price ? `₹${item.price[0].registerPrice}` : "",
                    }));
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                    // Handle error (clear token, logout user, etc.)
                }
                setIsLoading(false);
            }

            setProducts(products);
        }
        fetchCartItems();
    }, []);

    return (
        <>
            <div>
                <div className='divide-y divide-gray-200'>
                    <Accordion className='divide-y divide-gray-200'>
                        <AccordionItem key="1" title="Order Summary (1)" className='divide-y divide-gray-200'>
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                                    {products.map((item, index) => (
                                        <tr key={index}>
                                            <td className="flex items-center px-4 py-4 text-sm text-gray-800">
                                                <Image src={item.img} alt="Product Image" className="w-12 h-12" />
                                                <div>
                                                    <h3 className="font-semibold">Google Workspace</h3>
                                                    <a href={item.link} className="text-blue-500 text-sm">{item.name}</a>
                                                </div>
                                            </td>
                                            <td className="text-sm text-gray-800"></td>
                                            <td className="px-4 py-4 text-sm text-gray-800">
                                                <div className='flex'>
                                                    <p className="font-semibold p-4">{item.price}</p>
                                                    <button className="text-red-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </AccordionItem>
                    </Accordion>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                        <tr>
                            <td className="text-sm text-gray-800 px-2">
                                <ul className='bg-white text-left'>
                                    <li></li>
                                    <li className='py-1'>Subtotal</li>
                                    <li className='py-1'>Tax</li>
                                </ul>
                            </td>
                            <td className="flex items-center px-4 py-4 text-sm text-blue-800"></td>
                            <td className="text-sm text-gray-800">
                                <ul className='bg-white text-center'>
                                    <li></li>
                                    <li className='py-1'>₹ {cartItems.subTotal || "N/A"}</li>
                                    <li className='py-1'>₹ {(Number(cartItems.gst?.cgst?.Amt || 0) + Number(cartItems.gst?.sgst?.Amt || 0))}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="flex items-center px-4 py-4 text-sm text-blue-800"></td>
                            <td className="text-sm text-gray-800">
                                <ul className='bg-white text-center'>
                                    <li className='py-1 font-bold'>Total</li>
                                </ul>
                            </td>
                            <td className="text-sm text-gray-800">
                                <ul className='bg-white text-center'>
                                    <li className='py-1'>₹ {cartItems.Total || "N/A"}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PaymentPage;
