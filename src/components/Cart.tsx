import React, { useState } from 'react';
import Image from 'next/image';
import { CART } from '@/assets';
import { Accordion, AccordionItem } from "@nextui-org/accordion";

type SidebarProps = {
    onClick: () => void;
};

// Step 1: SummaryPage Component
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

);

// Step 2: LoginPage Component
const LoginPage = () => (
    <div className="flex flex-col justify-center pl-4 md:pl-0 lg:pl-0 pr-4 md:pr-0 lg:pr-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-2 text-left text-base md:text-base lg:text-lg font-bold leading-9 tracking-tight text-gray-900">Existing User?</h2>
            <p className='text-sm'>Please sign in with your credentials below to continue</p>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-5" action="#" method="POST">
                <div>
                    <label className="text-sm block">Email</label>
                    <input type='text' placeholder='Email'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div>
                    <label className="text-sm block">Password</label>
                    <input type='password' placeholder='Password'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div>
                    <div className="text-sm flex items-center justify-end">
                        <a href="#" className="font-semibold text-blue-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className="mt-4 w-2/4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Log In
                    </button>
                </div>
                <div className='text-center text-sm text-gray-500'>
                    New to NowDigitalEasy?
                    <a href="#" className="font-bold leading-6 text-blue-600">Sign up here</a>
                </div>
            </form>
        </div>
    </div>
);
const RegistrationPage = () => (
    <div className="flex flex-col justify-center pl-4 md:pl-0 lg:pl-0 pr-4 md:pr-0 lg:pr-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-2 text-left text-base font-bold leading-9 tracking-tight text-gray-900">New User?</h2>
            <p className='text-sm'>Create an account in 10 seconds</p>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm  overflow-y-auto">
            <form action="#" className="mt-4 grid grid-cols-6 gap-6">
                <div className="col-span-3">
                    <label className="text-sm block">First Name</label>
                    <input type='text' placeholder='First Name'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div className="col-span-3">
                    <label className="text-sm block">Last Name</label>
                    <input type='text' placeholder='Last Name'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div className="col-span-3">
                    <label className="text-sm block">Email</label>
                    <input type='email' placeholder='Email'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div className="col-span-3">
                    <label className="text-sm block">Phone Number</label>
                    <input type='text' placeholder='Phone Number'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div className="col-span-3">
                    <label className="text-sm block">Password</label>
                    <input type='password' placeholder='Password'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div className="col-span-3">
                    <label className="text-sm block">Company Name</label>
                    <input type='text' placeholder='Company Name'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div className="col-span-6">
                    <label className="text-sm block"> Address </label>
                    <input
                        type="text" placeholder='Address'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                    />
                </div>
                <div className="col-span-3">
                    <label className="text-sm block">City</label>
                    <input type='text' placeholder='City'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div className="col-span-3">
                    <label className="text-sm block">State</label>
                    <input type='text' placeholder='State'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div className="col-span-3">
                    <label className="text-sm block">Country</label>
                    <input type='text' placeholder='Country'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div className="col-span-3">
                    <label className="text-sm block">Pin Code</label>
                    <input type='text' placeholder='Pin Code'
                        className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
            </form>
        </div>
        <div className='flex justify-center'>
            <button className="mt-4 w-2/4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Create Account
            </button>
        </div>
        <div className='text-center text-sm text-gray-500'>
            Already have an account?
            <a href="#" className="font-bold leading-6 text-blue-600">Sign in</a>
        </div>
    </div>
);

// Step 3: PaymentPage Component
const PaymentPage = () => (
    <div>
        <div className='divide-y divide-gray-200'>
            <Accordion className='divide-y divide-gray-200'>
                <AccordionItem key="1" title="Order Summary (1)" className='divide-y divide-gray-200'>
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                            <tr>
                                <td className="flex items-center px-4 py-4 text-sm text-gray-800">
                                    <Image src={CART.google} alt="Google Workspace" className="w-12 h-12" />
                                    <div>
                                        <h3 className="font-semibold">Google Workspace</h3>
                                        <a href="#" className="text-blue-500 text-sm">thedesignerclub.com</a>
                                    </div>
                                </td>
                                <td className="text-sm text-gray-800"> </td>
                                <td className="px-4 py-4 text-sm text-gray-800">
                                    <div className='flex'>
                                        <p className="font-semibold p-4">₹225.00</p>
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
                                <td className="flex items-center px-4 py-4 text-sm text-gray-800">
                                    <Image src={CART.database} alt="Google Workspace" className="w-12 h-12" />
                                    <div>
                                        <h3 className="font-semibold">Linux Hosting</h3>
                                        <a href="#" className="text-blue-500 text-sm">iaaxin.com</a>
                                    </div>
                                </td>
                                <td className="text-sm text-gray-800"></td>
                                <td className="px-4 py-4 text-sm text-gray-800">
                                    <div className='flex'>
                                        <p className="font-semibold p-4">₹225.00</p>
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
                </AccordionItem>
            </Accordion>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                <tr>
                    <td className="text-sm text-gray-800 px-2">
                        <ul className='bg-white text-left'>
                            <li className=''></li>
                            <li className='py-1'>Subtotal</li>
                            <li className='py-1'>Tax</li>
                        </ul>
                    </td>
                    <td className="flex items-center px-4 py-4 text-sm text-blue-800"></td>
                    <td className="text-sm text-gray-800">
                        <ul className='bg-white text-center'>
                            <li className=''></li>
                            <li className='py-1'>₹ 1600.00</li>
                            <li className='py-1'>₹ 80.00</li>
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
                            <li className='py-1'>₹ 1680.00</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);


const Cart: React.FC<SidebarProps> = ({ onClick }) => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { id: 1, name: 'Summary' },
        { id: 2, name: 'Login' },
        { id: 3, name: 'Payment' },
    ];

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleClose = () => {
        console.log('Stepper closed');
    };

    // Function to render the content based on the current step
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <SummaryPage />;
            case 2:
            // return <LoginPage />;
            //return <Registration/>
            case 3:
                return <PaymentPage />;
            default:
                return <SummaryPage />;
        }
    };

    return (
        <div className="w-full md:w-full lg:w-[40vw] ml-auto bg-white shadow-lg hs-overlay fixed inset-0 z-50 block">
            {/* Header */}
            <div style={{ backgroundImage: 'linear-gradient(90.37deg,#d2d5fd .32%,#d8daf8 22.3%,#efe8e7 49.57%,#fef3e2 99.68%)' }}>
                <div className="mx-4">
                    <div className="flex items-end max-w-screen-lg py-4 mx-auto">
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
            <div>
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
                        <LoginPage />
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
