"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/assets';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SelectPlan from '@/components/SelectPlan';

interface Domain {
    name: string;
    status: string;
    price?: { registerPrice: number }[];
}
interface Price { period: string; amount: number; }
interface PlanFeatureProps { title: string; starter: string; advanced: string; premium: string; }
interface PlanCardProps { name: string; price: string; isStarter?: boolean; onAddToCart: () => void; showDropdown: boolean; }



const fetchDomainAvailability = async (domain: string) => {
    const response = await axios.post(
        "https://liveserver.nowdigitaleasy.com:5000/product/domain_availability?country_code=IN",
        { domain }
    );
    return response.data.response.map((item: any) => ({
        name: item.domain,
        status: item.status === "available" ? "Available" : item.status === "unavailable" ? "Unavailable" : "Unknown",
        price: item.price && item.price.length > 0 ? item.price : undefined,
    }));
};

const fetchPlans = async () => {
    const response = await axios.get('https://liveserver.nowdigitaleasy.com:5000/product//hosting?country_code=IN'); // Replace with your API endpoint
    if (!response) {
        throw new Error('Network response was not ok');
    }
    return response.data;
};

const RightPlan: React.FC = () => {
    const { data } = useQuery({ queryKey: ["plans"], queryFn: fetchPlans });
    const [activeDropdown, setActiveDropdown] = useState < string | null > (null);
    const [showInputForm, setShowInputForm] = useState < boolean > (false);
    const [currentStep, setCurrentStep] = useState < number > (0);
    const [isModalOpen, setIsModalOpen] = useState < boolean > (false);
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    const [price, setPrice] = useState < number > (0);
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState< Domain[] >(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
      });
    



    // Update price based on selected period
    useEffect(() => {
        if (data && data.product && data.product.length > 0) {
            const initialPrice = data.product[0].price.find((p: { period: string; }) => p.period === selectedPeriod);
            setPrice(initialPrice ? initialPrice.amount : 0);
        }
    }, [data, selectedPeriod]);
    useEffect(() => {
        // Save the cart to local storage whenever it changes
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Cart updated and saved to localStorage:", cart);
        }, [cart]);
    const handleAddToCartFunction=async(domain:Domain)=>{
        if (typeof window === 'undefined') return; 
    
      
        
            const token = window.localStorage.getItem('token');
            const newCartItem = {
              product: "hosting",
              productId:"6620bf5b9d26017a073f5c33",
              domainName: domain.name,
              type: "new",
              price: domain?.price[0]?.registerPrice,
              qty: 1,
              year: 1,
              EppCode: "",
              period: "oneTimeMonthly",
            };
            
           
            console.log(domain,"domaiiiiin for hosting");
            if (token) {
              try {
                const headers = {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                };
        
                const { data: existingCart } = await axios.get("https://liveserver.nowdigitaleasy.com:5000/cart", { headers });
          
                const updatedCartItems = existingCart.products?.length
                ? [...existingCart.products, newCartItem]
                : [newCartItem];
                const response = await axios.post(
                  "https://liveserver.nowdigitaleasy.com:5000/cart",
                  { data: updatedCartItems },
                  { headers }
                );
                console.log("API response for hosting:", response.data);
              } catch (error) {
                console.error("Failed to add to cart:", error);
                return;
              }
            } else {
              const cart = JSON.parse(localStorage.getItem("cart") || "[]");
              cart.push(newCartItem);
              localStorage.setItem("cart", JSON.stringify(cart));
              console.log("Cart updated and saved to localStorage for hosting:", cart);
            }
          
            setCart((prevCart) => [...prevCart, domain]);
            // queryClient.setQueryData<Domain[]>(
            //   ["domainAvailability", searchQuery],
            //   (oldDomains = []) =>
            //     oldDomains.map((d) =>
            //       d.name === domain.name ? { ...d, status: "Added" } : d
            //     )
            // );
    }

    const handleAddToCart = (planName: string) => {
        setActiveDropdown(activeDropdown === planName ? null : planName);
        setIsModalOpen(true); // Open the modal when adding to cart
        setCurrentStep(0); // Reset to the first step
    };

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleDurationChange = (e: { target: { value: any; }; }) => {
        const selected = e.target.value;
        setSelectedPeriod(selected);

        const selectedPrice = data.product[0].price.find((p: { period: any; }) => p.period === selected);
        setPrice(selectedPrice ? selectedPrice.amount : 0);
    };

    const { data: domains = [], refetch, isFetching } = useQuery<Domain[]>({
        queryKey: ["domainAvailability", searchQuery],
        queryFn: () => fetchDomainAvailability(searchQuery),
        enabled: false,
    });

    const handleSearchClick = () => {
        refetch().then(() => {
            setIsModalOpen(true);
        });
    };

    const DomainItem = ({ domain }: { domain: Domain }) => (
        <div className="flex justify-between bg-white items-center content-center  m-3">
            <div className="flex flex-col mx-4 max-md:mx-1 p-3 max-md:p-1">
                <span className="font-900 text-lg max-lg:text-md max-md:text-xs">{domain.name}</span>
                <div>
                    <span className={`text-[14px] w-[30px] max-md:text-xs ${domain.status === 'Available' ? 'text-green-500' :
                        domain.status === 'Added' ? 'text-yellow-600' :
                            domain.status === 'Unavailable' ? 'text-red-500' :
                                'text-gray-500'
                        }`}>
                        {domain.status}
                    </span>
                </div>
            </div>
            <div className="flex content-center items-center gap-8">
                <select className="border  rounded-md p-1 max-md:hidden" disabled={domain.status !== 'Available'}>
                    {[1, 2, 3, 5].map((year) => (
                        <option key={year} value={year}>
                            {year} year{year > 1 ? 's' : ''}
                        </option>
                    ))}
                </select>
                <div className="w-[150px] max-md:w-[40px]">
                    <span className="font-900 w-[200px]  text-center text-2xl max-lg:text-sm leading-tight">
                        {domain.price && domain.price.length > 0 ? `₹${domain.price[0].registerPrice}` : 'N/A'}
                    </span>
                    <div className="">
                        <span className="text-[14px] text-center max-md:hidden  max-lg:text-xs ">
                            {domain.price && domain.price.length > 0 ? `then   ₹${domain.price[0].registerPrice + 2}/Year` : ''}
                        </span>
                    </div>
                </div>
                <button
                    className={`text-white w-[120px]  max-md:w-[80px] max-md:mx-1 max-md:text-xs max-md:p-1 p-2 mx-3 rounded-md ${domain.status === 'Available'
                        ? 'bg-home-primary'
                        : domain.status === 'Added'
                            ? 'bg-red-500'
                            : domain.status === 'Unavailable'
                                ? 'bg-gray-400'
                                : 'bg-gray-500'
                        }`}
                    disabled={domain.status !== 'Available' && domain.status !== 'Added'} // Fix: Allow button to be clickable for 'Added' status
                    onClick={() => {
                        if (domain.status === "Available") {
                            handleAddToCartFunction(domain);
                        } 
                        }}
                >
                    {domain.status === 'Available'
                        ? 'Add to cart'
                        : domain.status === 'Added'
                            ? 'Remove'
                            : 'Unavailable'}
                </button>
            </div>
        </div>
    );
    const PlanModal: React.FC = () => (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="relative w-[80vw]  rounded-lg border border-black shadow-lg mb-8">
                <Image
                    src={IMAGES.HostBanner}
                    alt="home banner"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="absolute inset-0  rounded-lg bg-gradient-hosting-hero" // Ensure the image is behind the content
                />
                <div className="p-4 relative">
                    {currentStep === 0 && (
                        <div>
                            {activeDropdown === "Starter" && <div >
                                <SelectPlan handleNextStep={handleNextStep}  index={0} />                            
                            </div>}
                            {activeDropdown === "Advanced" && <div >
                                <SelectPlan handleNextStep={handleNextStep}  index={1} />                            

                            </div>}
                            {activeDropdown === "Premium" && <div >
                                <SelectPlan handleNextStep={handleNextStep}  index={2} />                            

                            </div>}
                        </div>
                    )}
                    {currentStep === 1 && (
                        <div className='flex flex-col items-start px-10'>
                            <div className='flex items-center gap-16 mx-3'>
                                <div className='flex items-center gap-4'>
                                    <input
                                        type="radio"
                                        name="domainOption"
                                        id="newDomain"
                                        onChange={() => setShowInputForm(true)}
                                    />
                                    <span className=' font-roboto-serif text-3xl'>
                                        Register a New Domain
                                    </span>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <input
                                        type="radio"
                                        name="domainOption"
                                        id="existingDomain"
                                        onChange={() => setShowInputForm(false)}
                                    />
                                    <span className=' font-roboto-serif text-3xl '>
                                        I already have a Domain Name
                                    </span>
                                </div>
                            </div>
                            <div className="flex w-full pb-6 max-md:pb-0">
                                {showInputForm ? (
                                    <div>
                                        <div className="flex m-3 rounded-xl">
                                            <input
                                                className="w-[60vw] p-6 border rounded-l-xl max-md:placeholder:text-[10px]"
                                                placeholder="Find and purchase a domain name"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                autoFocus
                                            />
                                            <button
                                                className={`bg-home-primary text-white  text-xl font-roboto font-700 px-6 p-2  rounded-r-xl ${isFetching ? "cursor-wait" : ""
                                                    }`}
                                                onClick={handleSearchClick}
                                                disabled={isFetching} // Disable button while loading
                                            >
                                                {isFetching ? "Searching..." : "Check Availability "}
                                            </button>
                                        </div>
                                        <div className="p-2 h-[300px] overflow-y-scroll hide-scrollbar">
                                            <div>
                                                {domains.map((domain, index) => (
                                                    <DomainItem key={index} domain={domain} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex m-3 rounded-xl">
                                        <input
                                            className="w-[60vw] p-6 border rounded-l-xl max-md:placeholder:text-[10px]"
                                            placeholder="Enter your domain name"

                                        />
                                        <button
                                            className="bg-domain-primary text-xl max-md:text-sm text-white px-8 max-md:px-2 rounded-r-xl"
                                        >
                                            <span className="font-roboto font-700">Add to Cart</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-[-15px] right-[-12px]  w-[40px] h-[40px] tex-2xl bg-gray-300 rounded-full  font-900"
                >
                    <span>✖</span>
                </button>
            </div>
        </div>
    );

    const PlanFeature: React.FC<PlanFeatureProps> = ({ title, starter, advanced, premium }) => (
        <tr className="border-t-[1px] border-black border-opacity-65 font-roboto-serif">
            <td className="sticky left-0 bg-white text-home-heading tracking-tighter text-md px-1 lg:text-2xl text-start pl-4 lg:pl-10 font-400 py-2 lg:py-4">
                {title}
            </td>
            <td className="text-home-heading text-center bg-[#D7F2FF] py-2 lg:py-4 text-lg lg:text-2xl">{starter}</td>
            <td className="text-home-heading text-center py-2 lg:py-4 text-lg lg:text-2xl">{advanced}</td>
            <td className="text-home-heading text-center py-2 lg:py-4 text-lg lg:text-2xl">{premium}</td>
        </tr>
    );

    const PlanCard: React.FC<PlanCardProps> = ({ name, price, isStarter, onAddToCart, showDropdown }) => (
        <th className={`text-center py-2 lg:py-4 relative ${isStarter ? 'bg-[#D7F2FF]' : ''}`}>
            <div className="flex flex-col gap-2 lg:gap-4">
                <span className="font-900 text-xl lg:text-4xl text-home-heading">{name}</span>
                <span className="font-900">
                    <sup className="text-lg lg:text-xl max-md:hidden">₹</sup>
                    <span className="text-3xl lg:text-5xl">{price}</span>/month
                </span>
                <button
                    className="bg-home-primary p-2 lg:p-4 text-white text-md lg:text-2xl font-900 rounded-lg mx-auto max-md:mx-1"
                    onClick={onAddToCart}
                >
                    Add to cart
                </button>
            </div>
        </th>
    );

    return (
        <div className="bg-[#B8D4FF] bg-opacity-50">
            <div className="flex justify-center">
                <span className="py-10 lg:py-20 text-3xl lg:text-6xl font-roboto font-900 text-home-heading text-center">
                    Choose a Right Plan for Your Website
                </span>
            </div>
            <div className="px-0 lg:px-16 pb-10">
                <div className="bg-white mx-0 lg:mx-14 overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead>
                            <tr>
                                <th className="sticky left-0 bg-white shadow-r-xl text-home-heading text-xl lg:text-5xl font-roboto font-900 tracking-tighter text-center py-4 lg:py-8">
                                    Plan Features
                                </th>
                                <PlanCard name="Starter" price="67" isStarter={true} onAddToCart={() => handleAddToCart("Starter")} showDropdown={activeDropdown === "Starter"} />
                                <PlanCard name="Advanced" price="99" onAddToCart={() => handleAddToCart("Advanced")} showDropdown={activeDropdown === "Advanced"} />
                                <PlanCard name="Premium" price="149" onAddToCart={() => handleAddToCart("Premium")} showDropdown={activeDropdown === "Premium"} />
                            </tr>
                        </thead>
                        <tbody>
                            <PlanFeature title="Host Websites" starter="1" advanced="50" premium="100" />
                            <PlanFeature title="SSD Storage (GB)" starter="50GB" advanced="100GB" premium="200GB" />
                            <PlanFeature title="Bandwidth" starter="Unlimited" advanced="Unlimited" premium="Unlimited" />
                            <PlanFeature title="Free .IN Domain (1st Year Only)" starter="1" advanced="" premium="1" />
                            <PlanFeature title="Subdomains" starter="5" advanced="100" premium="200" />
                            <PlanFeature title="FTP Users" starter="1" advanced="50" premium="100" />
                            <PlanFeature title="eMail Accounts" starter="2" advanced="50" premium="100" />
                            <PlanFeature title="Individual Mailbox Size (GB)" starter="1" advanced="1" premium="1" />
                            <PlanFeature title="Overall Mailbox Size (GB)" starter="2" advanced="50" premium="100" />
                            <PlanFeature title="Email Per Hour" starter="100" advanced="100" premium="100" />
                            <PlanFeature title="Email forwarding accounts" starter="Unlimited" advanced="Unlimited" premium="Unlimited" />
                            <PlanFeature title="FTP Users" starter="Unlimited" advanced="Unlimited" premium="Unlimited" />
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <PlanModal />}
        </div>
    );
};

export default RightPlan;
