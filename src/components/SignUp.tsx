import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useTransition, animated } from 'react-spring';
import { useMutation } from '@tanstack/react-query';

// Define the interface for form data
interface SignupFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  companyName: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  gstin: string;
  country: string;
}

// Define the interface for component props
interface SignUpUserProps {
  onClose: () => void;
  isOpen: boolean;
}

// Example countries data
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'IS', name: 'India' },
  // Add more countries as needed
];

// Function to handle the API request
const signupUser = async (formData: SignupFormData) => {
  const response = await fetch('https://liveserver.nowdigitaleasy.com:5000/client/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up');
  }

  return response.json();
};

const SignUpUser: React.FC<SignUpUserProps> = ({ onClose, isOpen }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
  const [selectedCountry, setSelectedCountry] = useState('');

  const { mutate } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success('Form submitted successfully!');
      onClose();
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    const formData = { ...data, country: selectedCountry };
    mutate(formData);
  };

  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateX(100%)' },
    config: { duration: 200 },
  });

  return transition((style, item) =>
    item ? (
      <animated.div
        style={style}
        className='bg-white fixed right-0 top-0 w-[28vw] z-50 max-2xl:w-[30vw] max-xl:w-[40vw] max-md:w-[100vw] h-full '
      >
        <div className='flex justify-center h-full bg-white overflow-y-scroll hide-scrollbar'>
          <button
            className='absolute top-6 right-6 font-900 text-2xl text-black'
            id='close'
            onClick={onClose}
          >
            ✖
          </button>
          <div className='justify-center flex items-center h-full mt-20'>
            <div className='flex flex-col text-center w-full max-w-md px-4'>
              <span className='font-roboto font-900 text-2xl'>New User?</span>
              <span className='px-2 font-roboto-serif text-xl'>Create an account in 10 seconds</span>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Form Fields */}
                  {[
                    { label: 'First Name', field: 'first_name', type: 'text' },
                    { label: 'Last Name', field: 'last_name', type: 'text' },
                    { label: 'Email', field: 'email', type: 'email' },
                    { label: 'Phone Number', field: 'phone_number', type: 'text' },
                    { label: 'Password', field: 'password', type: 'password' },
                    { label: 'Company Name', field: 'companyName', type: 'text' },
                    { label: 'Address', field: 'address', type: 'text' },
                    { label: 'City', field: 'city', type: 'text' },
                    { label: 'Pin Code', field: 'pincode', type: 'text' },
                    { label: 'State', field: 'state', type: 'text' },
                    { label: 'GSTIN', field: 'gstin', type: 'text' }, // Added GSTIN field
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <label
                        htmlFor={item.field}
                        className="font-source-sans-pro text-start text-lg font-400 font-roboto text-[13px] text-[#313131]"
                      >
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        {...register(item.field as keyof SignupFormData, { required: true })}
                        placeholder={item.label}
                        className="border-[1px] p-3 rounded-lg mt-2 text-[14px]"
                      />
                      {errors[item.field as keyof SignupFormData] && (
                        <span className="text-red-500 text-[10px] mt-1">
                          {item.label} is required
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <label
                      htmlFor="country"
                      className="font-source-sans-pro text-start font-400 text-lg font-roboto text-[#313131]"
                    >
                      Country
                    </label>
                    <select
                      {...register("country", { required: true })}
                      className="border-[1px] p-3 rounded-lg mt-2 text-[14px] opacity-50"
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      value={selectedCountry}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <span className="text-red-500 text-[10px] mt-1">
                        Country is required
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-3 mt-5 text-white bg-home-primary rounded-xl  font-source-sans-pro text-xl font-600 font-roboto"
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </animated.div>
    ) : null
  );
};

export default SignUpUser;
