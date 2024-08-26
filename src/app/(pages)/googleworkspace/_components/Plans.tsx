"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IMAGES, ICONS } from '@/assets';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import GsuitePlans from '@/components/GsutiePlans';

interface Domain {
    name: string;
    status: string;
    price?: { registerPrice: number }[];
}


// Define types for PlanFeature props
interface PlanFeatureProps {
    title: string;
    starterIcon?: string; // Optional prop for Starter plan icon
    advancedIcon?: string; // Optional prop for Advanced plan icon
    premiumIcon?: string; // Optional prop for Premium plan icon
    iconSrc: string; // Prop for the feature image source
}

interface PlanCardProps { name: string; price: string; isStarter?: boolean; onAddToCart: () => void; showDropdown: boolean; }

const fetchPlans = async () => {
    const response = await axios.get('https://liveserver.nowdigitaleasy.com:5000/product//hosting?country_code=IN'); // Replace with your API endpoint
    if (!response) {
        throw new Error('Network response was not ok');
    }
    return response.data;
};

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


const RightPlan: React.FC = () => {

    const { data } = useQuery({ queryKey: ["plans"], queryFn: fetchPlans });
    const [activeDropdown, setActiveDropdown] = useState < string | null > (null);
    const [showInputForm, setShowInputForm] = useState < boolean > (false);
    const [currentStep, setCurrentStep] = useState < number > (0);
    const [isModalOpen, setIsModalOpen] = useState < boolean > (false);
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    const [price, setPrice] = useState < number > (0);
    const [searchQuery, setSearchQuery] = useState("");
    // Update price based on selected period
    useEffect(() => {
        if (data && data.product && data.product.length > 0) {
            const initialPrice = data.product[0].price.find((p: { period: string; }) => p.period === selectedPeriod);
            setPrice(initialPrice ? initialPrice.amount : 0);
        }
    }, [data, selectedPeriod]);

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


    const PlanModal: React.FC = () => (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="relative w-[80vw]  rounded-lg border border-black shadow-lg mb-8 ">
                <div className="absolute inset-0  rounded-lg z-[-1]  " >
                    <Image src={IMAGES.HostBanner} alt="home banner"   layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="absolute inset-0 z-[-1] rounded-lg bg-background-Gsuite bg-opacity-70 " />
                </div>
                <div className="p-4 relative">
                    {currentStep === 0 && (
                       <div>
                       {activeDropdown === "Starter" && <div >
                           <GsuitePlans handleNextStep={handleNextStep}  index={0} />                            
                       </div>}
                       {activeDropdown === "Advanced" && <div >
                           <GsuitePlans handleNextStep={handleNextStep}  index={1} />                            

                       </div>}
                       {activeDropdown === "Premium" && <div >
                           <GsuitePlans handleNextStep={handleNextStep}  index={2} />                            

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
                                                className="bg-domain-primary text-xl max-md:text-sm text-white px-8 max-md:px-2 rounded-r-xl"
                                                onClick={handleSearchClick}

                                            >
                                                <span className="font-roboto font-700">Check Availability</span>
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

    const PlanFeature: React.FC<PlanFeatureProps> = ({ title, starterIcon, advancedIcon, premiumIcon, iconSrc }) => (
        <tr className='border-t-[1px] border-black font-roboto-serif'>
            <td className='text-home-heading text-lg lg:text-2xl text-start pl-4 font-400 py-2 lg:py-4'>
                <div className='flex gap-10 px-4'>
                    <Image src={iconSrc} alt={title} className='' />
                    <span className=''>{title}</span> {/* Use the new image prop */}
                </div>
            </td>
            <td className='text-home-heading text-center bg-[#D7F2FF] py-2 lg:py-4 text-lg lg:text-2xl'>
                <div className='flex justify-center'>
                    {starterIcon && <Image src={starterIcon} alt='Starter icon' />}
                </div>
            </td>
            <td className='text-home-heading text-center py-2 lg:py-4 text-lg lg:text-2xl'>
                <div className='flex justify-center'>
                    {advancedIcon && <Image src={advancedIcon} alt='Advanced icon' />}
                </div>
            </td>
            <td className='text-home-heading text-center py-2 lg:py-4 text-lg lg:text-2xl'>
                <div className='flex justify-center'>
                    {premiumIcon && <Image src={premiumIcon} alt='Premium icon' />}
                </div>
            </td>
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
    return (
        <div className='bg-[#B8D4FF] bg-opacity-50'>
            <div className='flex flex-col gap-6 justify-center py-10 lg:py-20'>
                <span className='text-3xl lg:text-6xl font-roboto font-900 text-home-heading text-center'>
                    Find the right plan for your business.
                </span>
                <span className='font-roboto-serif font-400 text-3xl max-md:text-lg text-center'>
                    Choose the Google Workspace edition that best fits your business.
                </span>
            </div>
            <div className='px-4 lg:px-16 pb-10'>
                <div className='bg-white mx-0 lg:mx-14 overflow-x-auto'>
                    <table className='w-full min-w-max rounded-2xl'>
                        <thead>
                            <tr>
                                <th className='w-[600px] max-md:text-lg  text-start bg-white text-home-heading text-xl lg:text-5xl font-roboto font-900 tracking-tight px-10 py-4 lg:py-8'>
                                    Google Workspace Features
                                </th>
                                <PlanCard name="Starter" price="67" isStarter={true} onAddToCart={() => handleAddToCart("Starter")} showDropdown={activeDropdown === "Starter"} />
                                <PlanCard name="Advanced" price="99" onAddToCart={() => handleAddToCart("Advanced")} showDropdown={activeDropdown === "Advanced"} />
                                <PlanCard name="Premium" price="149" onAddToCart={() => handleAddToCart("Premium")} showDropdown={activeDropdown === "Premium"} />
                            </tr>
                        </thead>
                        <tbody>
                            <PlanFeature
                                title="Get secure and personalised email account for your business"
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Gmail}
                            />
                            <PlanFeature
                                title="Setup HD video with 100 participants to ensure uninterrupted productivity."
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.video}
                            />
                            <PlanFeature
                                title="Keep track of important events and share your schedule."
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.calendar}
                            />
                            <PlanFeature
                                title="Secure communications tool, built for teams that makes team communication easy and efficient."
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.teams}
                            />
                            <PlanFeature
                                title="Generate and work on documents with images, tables, drawings, charts and more"
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Docs}
                            />
                            <PlanFeature
                                title="Get valuable insights via spreadsheet data using formulas, charts, connectors and macros"
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Sheets}
                            />
                            <PlanFeature
                                title="Make stunning presentations using templates, embed videos and images"
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Keeps}
                            />
                            <PlanFeature
                                title="Do engaging, high-quality sites for your project."
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Projects}
                            />
                            <PlanFeature
                                title="Create custom forms for surveys and questionnaires."
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Forms}
                            />
                            <PlanFeature
                                title="Manage your to-do’s, take notes on the go and never lose track of ideas."
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Buld}
                            />
                            <PlanFeature
                                title="Experience interesting conversations, discuss ideas, gather input and keep everyone in your organization engaged."
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Buld1}
                            />
                            <PlanFeature
                                title="Basic security and admin controls."
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Admin}
                            />
                            <PlanFeature
                                title="Standard Endpoint device management for account security"
                                starterIcon={ICONS.Check}
                                advancedIcon={ICONS.Check}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Google1}
                            />
                            <PlanFeature
                                title="Smart Search within and outside Google Workspace with Cloud Search."
                                starterIcon={ICONS.Close}
                                advancedIcon={ICONS.Close}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Google2}
                            />
                            <PlanFeature
                                title="Vault for eDiscovery for emails, chats, and files and archiving."
                                starterIcon={ICONS.Close}
                                advancedIcon={ICONS.Close}
                                premiumIcon={ICONS.Check}
                                iconSrc={ICONS.Google3}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <PlanModal />}
        </div>
    );
}

export default RightPlan;
