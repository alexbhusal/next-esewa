"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const Home = () => {
  const [formData, setFormData] = useState({
    amount: "",
    tax_amount: "0",
    total_amount: "10",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:3000/payment/success",
    failure_url: "http://localhost:3000/payment/failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) =>
    CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(
        `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
        secret
      )
    );

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    setFormData((prevState) => ({
      ...prevState,
      signature: generateSignature(
        total_amount,
        transaction_uuid,
        product_code,
        secret
      ),
    }));
  }, [formData.amount]);

  const handleChange = ({ target }) =>
    setFormData((prevState) => ({
      ...prevState,
      amount: target.value,
      total_amount: target.value,
    }));

  return (
    <>
      <h1 className="text-center m-5 text-2xl font-semibold">NEXT ESEWA</h1>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        <div className="border-black border-2 p-5 m-5 ">
          <h1 className="text-center font-bold">For Testing Use </h1>
          <h1>eSewa ID: <span className="text-rose-500 font-serif">9806800001</span></h1>
          <h1>Password: <span className="text-indigo-400 font-serif">Nepal@123</span></h1>
          <h1>MPIN: <span className="text-emerald-600 font-serif">1122</span></h1>
          <h1>Token: <span className="text-orange-800 font-serif">123456</span></h1>
        </div>
        <div className="">
          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
          >
            <input
              type="text"
              id="amount"
              name="amount"
              placeholder="Enter Amount"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            {Object.entries(formData).map(
              ([key, value]) =>
                key !== "amount" &&
                key !== "signature" && (
                  <input
                    key={key}
                    type="hidden"
                    name={key}
                    value={value}
                    required
                  />
                )
            )}
            <input
              type="hidden"
              id="signature"
              name="signature"
              value={formData.signature}
              required
            />
              <div className="flex m-2 justify-center items-center">
              <input
                className="border-black border-4 p-2 bg-amber-100 font-semibold rounded-4xl"
                value="Pay via E-Sewa"
                type="submit"
              />
              </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
