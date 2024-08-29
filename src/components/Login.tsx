import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTransition, animated } from 'react-spring';
import { useAppDispatch } from '../store/store';
import { loginSuccess, loginFailure } from '../store/authSlice';
import { redirect } from 'next/navigation';

interface LoginProps {
    onClose: () => void;
    isOpen: boolean;
}

interface LoginFormInputs {
    email: string;
    password: string;
}

const loginUser = async (data: { email: string; password: string }) => {
    const response = await fetch('https://liveserver.nowdigitaleasy.com:5000/client/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
};

const Login: React.FC<LoginProps> = ({ onClose, isOpen }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const dispatch = useAppDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(loginSuccess({ token: data.token, user: data.data.fullName })); // Dispatching token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData',data.data.fullName); // Store user data separately
            toast.success('Login successful');
            setIsLoggedIn(true);
            onClose(); // Optionally close the login modal
        },
        onError: (error: Error) => {
            dispatch(loginFailure(error.message));
            toast.error(error.message || 'Login failed');
        },
    });

    const onSubmit = (data: LoginFormInputs) => {
        mutation.mutate(data);
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
                className='bg-black fixed right-0 top-0 w-[28vw] z-50 max-2xl:w-[30vw] max-xl:w-[40vw] max-md:w-[100vw] h-full'
            >
                <div className='flex justify-center h-full bg-white'>
                    <button
                        className='absolute top-6 right-6 font-900 text-2xl text-black'
                        id='close'
                        onClick={onClose}
                    >
                        ✖
                    </button>
                    <div className='justify-center flex items-center h-full'>
                        <div className='flex flex-col text-center w-[350px]'>
                            <span className='font-roboto font-900 text-2xl'>Existing User?</span>
                            <span className='px-2 font-roboto-serif text-xl'>Please sign in with your credentials below to continue.</span>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                                <div className='flex flex-col text-start gap-3 pt-6'>
                                    <label htmlFor="email" className='text-2xl font-roboto-serif'>Email</label>
                                    <input
                                        type='email'
                                        placeholder='Enter the Email Address'
                                        {...register('email', { required: 'Email is required' })}
                                        className='border p-3 w-[350px]'
                                    />
                                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                                </div>
                                <div className='flex flex-col text-start gap-2 pt-4'>
                                    <label htmlFor="password" className='text-2xl font-roboto-serif'>Password</label>
                                    <input
                                        type='password'
                                        placeholder='Enter the Password'
                                        {...register('password', { required: 'Password is required' })}
                                        className='border p-3 w-[350px]'
                                    />
                                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                                </div>
                                <span className='text-end pt-1 text-home-primary font-400'>Forgot Password</span>
                                <button
                                    type='submit'
                                    className='bg-home-primary text-white mx-2 mt-4 mb-2 text-2xl font-800 w-[300px] py-2'
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? 'Logging in...' : 'Login'}
                                </button>
                                <span>New to NowDigitalEasy? <span className='text-home-primary'>Sign up here</span></span>
                            </form>
                        </div>
                    </div>
                </div>
            </animated.div>
        ) : null
    );
};

export default Login;
