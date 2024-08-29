const LoginPage = ( ) => (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 mb-16">
        <div className="sm:w-full sm:max-w-sm">
            <h2 className="mt-2 text-left text-base md:text-base lg:text-lg font-bold leading-9 tracking-tight text-gray-900">
                Existing User?
            </h2>
            <p className="text-sm">Please sign in with your credentials below to continue</p>
        </div>
        <div className="mt-4 sm:w-full sm:max-w-sm">
            <form className="space-y-5" action="#" method="POST">
                <div>
                    <label className="text-xl block">Email</label>
                    <input 
                        type="text" 
                        placeholder="Email"
                        className="px-4 py-3 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" 
                    />
                </div>
                <div>
                    <label className="text-sm block">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        className="px-4 py-3 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" 
                    />
                </div>
                <div>
                    <div className="text-sm flex items-center justify-end">
                        <a href="#" className="font-semibold text-blue-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="mt-4 w-2/4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Log In
                    </button>
                </div>
                <div className="text-center text-sm text-gray-500">
                    New to NowDigitalEasy?
                    <a href="#" className="font-bold leading-6 text-blue-600">Sign up here</a>
                </div>
            </form>
        </div>
    </div>
);

export default LoginPage;
