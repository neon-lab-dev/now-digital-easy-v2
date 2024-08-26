import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SelectPlanProps {
    handleNextStep: () => void;
    index: number; // Specify that index should be a number
}

const GsuitePlans: React.FC<SelectPlanProps> = ({ handleNextStep, index }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('Annual-Monthly');
    const [price, setPrice] = useState<number>(0);

    const fetchPlans = async () => {
        const response = await axios.get('https://liveserver.nowdigitaleasy.com:5000/product/gsuite?country_code=IN');
        if (!response) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    };

    const { data } = useQuery({ queryKey: ["Gsuite"], queryFn: fetchPlans });
    console.log(data)

    useEffect(() => {
        if (data && data.products && data.products.length > 0) {
            const initialPrice = data.products[index].price.find((p: { period: string; }) => p.period === selectedPeriod);
            setPrice(initialPrice ? initialPrice.offerPrice : 0);
        }
    }, [data, selectedPeriod]);

    const handleDurationChange = (e: { target: { value: string; }; }) => {
        const selected = e.target.value;
        setSelectedPeriod(selected);

        const selectedPrice = data.products[index].price.find((p: { period: string; }) => p.period === selected);
        setPrice(selectedPrice ? selectedPrice.offerPrice : 0);
    };

    return (
        <div>
            <div className="flex justify-between items-center py-10 mx-4 md:mx-10">
                <div className='flex flex-col gap-1'>
                    <span className='font-roboto font-900 text-4xl text-home-heading'>Plan Name</span>
                    <span className='text-3xl font-400 font-roboto-serif'>{data?.products[index]?.name}</span>
                </div>
                <div className='flex items-center justify-center gap-10'>
                    <div className='flex flex-col gap-3'>
                        <span className='text-4xl font-roboto font-900 text-home-heading'>Duration</span>
                        <select
                            name="duration"
                            id="duration"
                            className='p-3 rounded-lg'
                            value={selectedPeriod}
                            onChange={handleDurationChange}
                        >
                            {data?.products[index]?.price.map((p: any) => (
                                <option key={p.period} value={p.period}>
                                    {p.period.charAt(0).toUpperCase() + p.period.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='font-roboto font-900 text-4xl text-home-heading'>Total</span>
                        <span className='text-4xl font-400 font-roboto-serif'>{price}/-</span>
                    </div>
                    <button
                        className='bg-home-primary text-3xl font-900 text-white py-4 px-4 rounded-2xl'
                        onClick={handleNextStep}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GsuitePlans;
