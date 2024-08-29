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
    </div>
);

export default RegistrationPage;