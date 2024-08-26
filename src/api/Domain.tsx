import axios from "axios";

export const fetchDomainAvailability = async (domain: string) => {
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