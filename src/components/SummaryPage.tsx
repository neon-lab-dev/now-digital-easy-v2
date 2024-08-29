import Image, { StaticImageData } from 'next/image';
import { CART } from '@/assets';
import { useState, useEffect } from 'react';

interface CartItem {
    product: string;
    productId: string;
    domainName?: string; // Optional for some products
    period?: string; // Optional for some products
    name?: string; // Optional for some products
    status?: string; // Optional for some products
    price?: {
        productId: string;
        tld: string;
        year: number;
        registerPrice: number;
        _id: string;
    }[];
}

interface Product {
    name: string;
    link: string;
    img: StaticImageData; // Assuming static images for simplicity
    price: string;
    domainName?: string; // Optional field
    period?: string; // Optional field
}

const SummaryPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCartItems = () => {
            try {
                const savedCart = localStorage.getItem('cart');
                const cartItems: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

                const formattedProducts: Product[] = cartItems.map((item) => {
                    if (item.product === "Hosting") {
                        return {
                            name: "Hosting",
                            link: item.domainName || "Unknown Hosting",
                            img: CART.database, // Use the appropriate image
                            price: "N/A", // Update price logic as needed
                            domainName: item.domainName,
                            period: item.period,
                        };
                    } else if (item.product === "Gsuite") {
                        return {
                            name: "Gsuite",
                            link: item.domainName || "Unknown Gsuite Product",
                            img: CART.google, // Use the appropriate image
                            price: "Price included in Gsuite Plan", // Set Gsuite-specific price logic
                            domainName: item.domainName,
                            period: item.period,
                        };
                    } else {
                        return {
                            name: "Domain",
                            link: item.name || "Unknown Product",
                            img: CART.www, // Use the appropriate image
                            price: item.price ? `₹${item.price[0].registerPrice}` : "N/A",
                        };
                    }
                });

                setProducts(formattedProducts);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

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
                            <th className="px-4 py-4 text-xs md:text-sm lg:text-base font-bold text-black tracking-wider">Product</th>
                            <th className="px-4 py-4 text-xs md:text-sm lg:text-base font-bold text-black tracking-wider">Domain/Details</th>
                            <th className="px-4 py-4 text-xs md:text-sm lg:text-base font-bold text-black tracking-wider">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="flex items-center px-4 py-4 text-sm md:text-base lg:text-lg text-gray-800">
                                    <Image src={product.img} alt={product.name} className="w-6 h-6 md:w-12 md:h-12 lg:w-12 lg:h-12" />
                                    <div className="ml-2">
                                        <h3 className="text-xs md:text-sm lg:text-base font-semibold">{product.name}</h3>
                                        <a href={product.link} className="text-blue-500 text-xs md:text-sm lg:text-base">{product.link}</a>
                                    </div>
                                </td>
                                <td className="text-sm md:text-base lg:text-lg text-gray-800">
                                    {product.domainName ? (
                                        <div>
                                            <p>{product.domainName}</p>
                                            {product.period && <p>{product.period}</p>}
                                        </div>
                                    ) : (
                                        "N/A"
                                    )}
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
