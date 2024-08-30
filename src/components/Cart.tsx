import React, { useState, useEffect } from "react";
import SummaryPage from "@/components/SummaryPage";
import PaymentPage from "./Paymentpage";
import RegistrationPage from "./RegistrationPage";
import { useDispatch, useSelector } from "react-redux";
import { setIsSidebarOpen } from "@/store/sidebarSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state: any) => state.sidebar);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration

  useEffect(() => {
    if (isAuthenticated && currentStep === 2) {
      // If the user is authenticated, skip to the PaymentPage (step 3)
      setCurrentStep(3);
    }
  }, [isAuthenticated, currentStep]);

  const steps = [
    { id: 1, name: "Summary" },
    { id: 2, name: "Login" },
    { id: 3, name: "Payment" },
  ];

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full md:w-full lg:w-[40vw] ml-auto bg-white shadow-lg fixed inset-0 z-50 overflow-scroll hide-scrollbar">
      {/* Header */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(90.37deg,#d2d5fd .32%,#d8daf8 22.3%,#efe8e7 49.57%,#fef3e2 99.68%)",
        }}
      >
        <div className="mx-4">
          <div className="flex max-w-screen-lg py-4 mx-auto">
            {steps.map((step, index) => (
              <div className="w-full" key={step.id}>
                <div className="flex items-center w-full">
                  <div
                    className={`w-8 h-8 shrink-0 mx-[-1px] p-1.5 flex items-center justify-center rounded-full ${currentStep > step.id ? "bg-green-600" : "bg-gray-300"
                      }`}
                  >
                    {currentStep > step.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full fill-white"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                    ) : (
                      <span className="text-base text-white font-bold">
                        {step.id}
                      </span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-full h-1 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                        }`}
                    ></div>
                  )}
                </div>
                <h6
                  className={`text-base font-bold mb-2 ${currentStep > step.id ? "text-green-500" : "text-gray-500"
                    }`}
                >
                  {step.name}
                </h6>
              </div>
            ))}
          </div>
          <button
            className="absolute top-4 right-4 text-sm text-gray-500"
            onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="black"
              className="font-bold bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {currentStep === 1 && <SummaryPage />}

        {currentStep === 2 && !isAuthenticated && (
          <>
            {isLogin ? <div className="flex flex-col justify-center items-center  px-4 ">
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
                  <div>
                  </div>
                </form>
              </div>
            </div> : <RegistrationPage />}
            <div className="text-center text-sm text-gray-500">
              {isLogin ? (
                <>
                  New to NowDigitalEasy?{" "}
                  <button
                    onClick={toggleLogin}
                    className="font-bold leading-6 text-blue-600"
                  >
                    Sign up here
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={toggleLogin}
                    className="font-bold leading-6 text-blue-600"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {currentStep === 3 && <PaymentPage />}

        <div className="flex justify-center mt-4">
          <button
            onClick={handleNext}
            className="w-2/4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {currentStep === 3 ? "Pay" : "Contiune"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
