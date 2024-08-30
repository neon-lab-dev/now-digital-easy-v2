// pages/RightPlan.tsx or components/RightPlan.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PlanModal from './PlanModal'; // Import the PlanModal component

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

    console.log(price)

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
