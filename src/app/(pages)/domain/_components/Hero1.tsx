"use client";
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";


interface Domain {
  name: string;
  status: string;
  price: string;
}

const words = [".education", ".travel", ".fun", ".online"];
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [cart, setCart] = useState<Domain[]>([]);
  const [domains, setDomains] = useState<Domain[]>([
    { name: "iaaxin.in", status: "Available", price: "₹1,040.00" },
    { name: "example.com", status: "Available", price: "₹1,040.00" },
    { name: "unavailable.com", status: "Unavailable", price: "₹1,040.00" }
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleSearchClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const TEXTS = ["travel", "tech", "education", "fun", "online"];
  const getTextColor = (text: string) => {
    if (text === "travel" || text === "fun") {
      return "#A2197F";
    } else {
      return "#0011FF";
    }
  };


  const handleAddToCart = (domain: Domain) => {
    setDomains(domains.map(d =>
      d.name === domain.name
        ? { ...d, status: "Added" }
        : d
    ));
    setCart([...cart, domain]);
  };

  const handleRemoveFromCart = (domain: Domain) => {
    setDomains(domains.map(d =>
      d.name === domain.name
        ? { ...d, status: "Available" }
        : d
    ));
    setCart(cart.filter(item => item.name !== domain.name));
  };

  const isInCart = (domain: Domain) => cart.some(item => item.name === domain.name);

  const DomainItem = ({ domain }: { domain: Domain }) => (
    <div className="flex justify-between bg-white items-center">
      <div className="flex flex-col mx-4 max-md:mx-1 p-3 max-md:p-1 ">
        <span className="font-900 text-lg max-lg:text-md max-md:text-xs">{domain.name}</span>
        <div>
          <span className={`text-[14px] w-[30px] max-md:text-xs ${domain.status === 'Available' ? 'text-green-500' : domain.status === 'Added' ? 'text-yellow-600' : 'text-red-500'}`}>
            {domain.status}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <select className="border rounded-md p-1 max-md:hidden">
          {[1, 2, 3, 5].map((year) => (
            <option key={year} value={year}>{year} year{year > 1 ? 's' : ''}</option>
          ))}
        </select>
        <div>
          <span className="font-900 text-2xl max-lg:text-sm leading-tight">{domain.price}</span>
          <div>
            <span className="text-[14px] max-lg:text-xs">then ₹1,210.00/year</span>
          </div>
        </div>
        <button
          className={`text-white w-[120px] max-md:hidden max-md:w-[80px] max-md:mx-1 max-md:text-xs max-md:p-1 p-2 mx-3 rounded-md ${domain.status === 'Available' ? 'bg-home-primary' : domain.status === 'Added' ? 'bg-red-500' : 'bg-gray-400'}`}
          onClick={() => {
            if (domain.status === 'Available') {
              handleAddToCart(domain);
            } else if (domain.status === 'Added') {
              handleRemoveFromCart(domain);
            }
          }}
          disabled={domain.status === 'Unavailable'}
        >
          {domain.status === 'Available' && !isInCart(domain) ? 'Add to cart' : domain.status === 'Added' ? 'Remove' : 'Unavailable'}
        </button>
        <button className="md:hidden p-1">
          <Image src={ICONS.cartmodel} alt="cart" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="pt-[250px] max-md:pt-28 max-lg:pt-36 w-full flex flex-col gap-4 max-lg:gap-2 max-md:gap-2 bg-gradient-domain-hero relative z-20">
      <Image
        src={IMAGES.domain}
        alt="domain"
        className="absolute top-0 right-0 w-90 z-0"
        style={{ zIndex: "-1" }}
      />
      <Image
        src={IMAGES.domain2}
        alt="domain"
        className="absolute bottom-0 left-0 w-30 z-0"
        style={{ zIndex: "-1" }}
      />
      <div className="flex flex-col items-center gap-2 z-10">
      <div className="font-900 text-[16px] md:text-[33px] w-auto xl:text-[46px] 2xl:text-[56px] leading-[30px] md:leading-[46px] xl:leading-[67px] text-primary-500  flex gap-[5px] justify-center  xl:w-[1300px]">
            <span className=" w-auto">Expand your horizons with .</span>
            <TextTransition
              direction="down"
              springConfig={presets.gentle}
              delay={0}
              style={{ color: getTextColor(TEXTS[currentWordIndex % TEXTS.length]) }}
            >
              {TEXTS[currentWordIndex % TEXTS.length]}
            </TextTransition>
          </div>

        <span className="text-center text-[26px] text-home-heading max-lg:text-[18px] font-900 tracking-tight max-md:text-[12px] font-roboto ">
          Get started with the perfect domain.
        </span>
      </div>
      <div className="flex justify-center w-full pb-10 max-lg:pb-4 max-md:pb-2 z-10">
        <div className="flex m-3 rounded-xl">
          <input
            className="w-[700px] max-2xl:w-[500px] max-xl:w-[400px] max-md:w-[200px] p-5 max-lg:p-3 max-md:p-2 border rounded-l-xl max-md:placeholder:text-[10px]"
            placeholder="Find and purchase a domain name"
          />
          <button
            className="bg-domain-primary text-xl max-md:text-sm text-white px-8 max-md:px-2 rounded-r-xl"
            onClick={handleSearchClick}
          >
            <span className="font-roboto font-700">Search</span>
          </button>
        </div>
      </div>
      <span className="text-center text-2xl max-2xl:text-xl max-lg:text-lg font-600 pt-[10px] max-lg:pt-10 max-md:pt-10 lg:pt-[120px] pb-[20px] md:pb-[30px] lg:pb-[40px] leading-[20.4px] text-home-body justify-center font-roboto-serif z-10">
        12,000+ global businesses trust us to transform & grow digitally
      </span>
      <div className="flex justify-center items-center gap-4 md:gap-8 lg:gap-16 pb-6 overflow-hidden z-10">
        {[IMAGES.brand2, IMAGES.brand3, IMAGES.brand6, IMAGES.brand4, IMAGES.brand5, IMAGES.brand1, IMAGES.brand7, ICONS.gol, IMAGES.brand1, IMAGES.brand7, ICONS.gol].map((src, index) => (
          <Image key={index} src={src} alt="" className="w-[120px]" />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center max-md:justify-normal pt-24 max-md:pt-16 max-md:block z-50">
          <div className="relative bg-gradient-domain-hero p-5 max-md:p-3 rounded-xl shadow-xl pb-10 max-lg:pb-4">
            <button
              className="absolute top-[-8px] right-[-10px] text-xl bg-white rounded-full"
              onClick={handleCloseModal}
            >
              <Image src={ICONS.close} alt="close" />
            </button>
            <div className="flex justify-center w-full pb-6 max-md:pb-0">
              <div className="flex m-3 max-md:m-2 rounded-xl">
                <input
                  className="max-xl:w-full w-[1100px] p-5 max-lg:p-3 max-md:p-2 max-md:placeholder:text-[10px] border rounded-l-xl"
                  placeholder="Find and purchase a domain name"
                />
                <button
                  className="bg-domain-primary text-xl max-md:text-sm text-white px-8 max-md:px-2 rounded-r-xl"
                  onClick={handleSearchClick}
                >
                  <span className="font-roboto font-700">Search</span>
                </button>
              </div>
            </div>
            <div className="p-2">
              {domains.map((domain) => (
                <div className="py-1" key={domain.name}>
                  <DomainItem domain={domain} />
                </div>
              ))}
              {cart.length > 0 && (
                <div className="flex items-center justify-between my-4 font-roboto font-700 bg-home-body p-4">
                  <span className="text-2xl text-white">{cart.length} item{cart.length > 1 ? 's' : ''} added to your cart</span>
                  <button className="text-2xl text-black bg-home-secondary mx-4 px-10 py-2 rounded-md">View Cart</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;


// {cart.length > 0 && (
//   <div className="flex items-center justify-between my-4 font-roboto font-700 bg-home-body px-10 max-md:px-2 max-md:mx-4 mx-5 py-3 max-md:py-1">
//     <span className="text-2xl text-white max-lg:text-sm">{cart.length} item{cart.length > 1 ? 's' : ''} added to your cart</span>
//     <button className="text-2xl text-black bg-home-secondary mx-4 px-10 py-2 rounded-md max-md:mx-0 max-md:px-2 max-md:text-sm max-md:py-1">View Cart</button>
//   </div>
// )}