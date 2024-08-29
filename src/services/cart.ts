import axios from "./axios";

export const handleGetAllCartItemsService = async (
  currency_code: string = "INR"
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://liveserver.nowdigitaleasy.com:5000/cart?currency_code=${currency_code}`
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleUpdateCartService = async ({ data }: { data: any[] }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://liveserver.nowdigitaleasy.com:5000/cart", data, {})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleAddAItemToCartService = async (dataToSend: any) => {
  return new Promise(async (resolve, reject) => {
    handleGetAllCartItemsService("") //todo send currency code and token
      .then((cartItems: any) => {
        let data = [dataToSend];
        if (!cartItems || cartItems?.products?.length === 0) {
        } else {
          // @ts-ignore
          let oldCartItems = cartItems?.products?.filter((item) => {
            if (item.product === "gsuite" || item.product === "hosting") {
              // For 'gsuite' or 'domain', check both productId and domainName
              return !(
                item.product === dataToSend.product &&
                item.domainName === dataToSend.domainName
              );
            } else {
              // For other products, check only productId
              return item.productId !== dataToSend.productId;
            }
          });
          data = [...(oldCartItems ?? []), ...data];
        }
        axios
          .post("https://liveserver.nowdigitaleasy.com:5000/cart", { data })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
