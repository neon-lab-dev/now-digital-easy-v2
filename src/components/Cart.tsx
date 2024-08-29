import React, { useState } from 'react';
import Image from 'next/image';
import { CART } from '@/assets';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import SummaryPage from "@/components/SummaryPage"
import PaymentPage from './Paymentpage';
import LoginPage from './CartLogin';
import RegistrationPage from './RegistrationPage';

type SidebarProps = {
    onClick: () => void;
};

const Cart: React.FC<SidebarProps> = ({ onClick }) => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { id: 1, name: 'Summary' },
        { id: 2, name: 'Login' },
        { id: 3, name: 'Payment' },
    ];

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };


    // Function to render the content based on the current step
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <SummaryPage />;
            case 2:
                return <LoginPage />;
            case 3:
                return <RegistrationPage />;

            case 4:
                return <PaymentPage />
            default:
                return <SummaryPage />;
        }
    };

    return (
        <div className="w-full md:w-full lg:w-[40vw] ml-auto bg-white shadow-lg hs-overlay fixed inset-0 z-50 block">
            {/* Header */}
            <div style={{ backgroundImage: 'linear-gradient(90.37deg,#d2d5fd .32%,#d8daf8 22.3%,#efe8e7 49.57%,#fef3e2 99.68%)' }}>
                <div className="mx-4">
                    <div className="flex  max-w-screen-lg py-4 mx-auto">
                        {steps.map((step, index) => (
                            <div className="w-full" key={step.id}>
                                <div className="flex items-center w-full">
                                    <div className={`w-8 h-8 shrink-0 mx-[-1px] p-1.5 flex items-center justify-center rounded-full ${currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'}`}>
                                        {currentStep > step.id ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 24 24">
                                                <path
                                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                                    data-original="#000000"
                                                />
                                            </svg>
                                        ) : (
                                            <span className="text-base text-white font-bold">{step.id}</span>
                                        )}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-full h-1 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                    )}
                                </div>
                                <h6 className={`text-base font-bold mb-2 ${currentStep > step.id ? 'text-green-500' : 'text-gray-500'}`}>{step.name}</h6>
                            </div>
                        ))}
                    </div>
                    <button className="absolute top-4 right-4 text-sm text-gray-500" onClick={onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="font-bold bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className=''>
                {currentStep === 1 && (
                    <div>
                        <SummaryPage />
                        <div className='flex justify-center'>
                            <button onClick={handleNext} className="mt-4 w-2/4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                Continue to Cart
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <LoginPage/>
                        {/* <RegistrationPage /> */}
                        <div className='flex justify-center'>
                            <button onClick={handleNext} className="mt-4 w-2/4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <RegistrationPage />
                        <div className='flex justify-center'>
                            <button onClick={handleNext} className="mt-4 w-2/4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {currentStep === 4 && (
                    <div>
                        <PaymentPage />
                        <div className='flex justify-center'>
                            <button onClick={onClick} className="mt-4 w-2/4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
