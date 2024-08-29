// pages/RightPlan.tsx or components/RightPlan.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PlanModal from './PlanModel'; // Import the PlanModal component
import SelectPlan from '@/components/SelectPlan';
import { ICONS } from '@/assets';
import Image from 'next/image';


interface Domain {
    name: string;
    status: string;
    price?: { registerPrice: number }[];
}
interface Price { period: string; amount: number; }
interface PlanFeatureProps {
    title: string;
    starterIcon: any; // You can replace `any` with the correct type, e.g., `string` or `StaticImageData` if using Next.js Image
    advancedIcon: any;
    premiumIcon: any;
    iconSrc: any;
}interface PlanCardProps { name: string; price: string; isStarter?: boolean; onAddToCart: () => void; showDropdown: boolean; }

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
    const [currentStep, setCurrentStep] = useState < number > (0);
    const [isModalOpen, setIsModalOpen] = useState < boolean > (false);
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    const [price, setPrice] = useState < number > (0);
    const [searchQuery, setSearchQuery] = useState("");
    const [showInputForm, setShowInputForm] = useState < boolean > (true); // Ensure this state is defined

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

    const { data: domains = [], refetch, isFetching } = useQuery < Domain[] > ({
        queryKey: ["domainAvailability", searchQuery],
        queryFn: () => fetchDomainAvailability(searchQuery),
        enabled: false,
    });

    const handleSearchClick = () => {
        refetch().then(() => {
            setIsModalOpen(true);
        });
    };

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
                                <th className="sticky left-0 w-[600px] bg-white shadow-r-xl text-home-heading text-xl lg:text-5xl font-roboto font-900 tracking-tighter text-center py-4 lg:py-8">
                                    Plan Features
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
            {activeDropdown === "Starter" && <div >
                <PlanModal 
                isOpen={isModalOpen}
                currentStep={currentStep}
                handleNextStep={handleNextStep}
                setIsModalOpen={setIsModalOpen}
                showInputForm={showInputForm}
                setShowInputForm={setShowInputForm}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                domains={domains}
                refetch={refetch}
                isFetching={isFetching}
                index={0}
            />
            </div>}
            {activeDropdown === "Advanced" && <div >
                <PlanModal 
                isOpen={isModalOpen}
                currentStep={currentStep}
                handleNextStep={handleNextStep}
                setIsModalOpen={setIsModalOpen}
                showInputForm={showInputForm}
                setShowInputForm={setShowInputForm}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                domains={domains}
                refetch={refetch}
                isFetching={isFetching}
                index={1}

            />
            </div>}
            {activeDropdown === "Premium" && <div >
                <PlanModal 
                isOpen={isModalOpen}
                currentStep={currentStep}
                handleNextStep={handleNextStep}
                setIsModalOpen={setIsModalOpen}
                showInputForm={showInputForm}
                setShowInputForm={setShowInputForm}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                domains={domains}
                refetch={refetch}
                isFetching={isFetching}
                index={2}
            />
            </div>}
        </div>
    );
};

export default RightPlan;
