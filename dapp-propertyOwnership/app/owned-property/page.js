"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { fetchProperties } from "@/utils/api/getFetch";
import { toast } from "sonner";
import { decryptFromBytes32, encryptToBytes32 } from "@/utils/hashChar";
import { useAccountAddress } from "@/zustand/addressStore";
import { connectMetamask } from "@/utils/connectMetamask";

const OwnProperty = () => {
  const accountAddress = useAccountAddress((state) => state.accountAddress);
  const setAccountAddress = useAccountAddress(
    (state) => state.updateAccountAddress
  );
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProperty = async () => {
    setLoading(true);

    const res = await fetchProperties();
    console.log(res);
    if (!res.success) {
      toast.error(`${res.message}`);
    } else {
      setProperties(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (accountAddress !== "") {
        console.log(`get ${accountAddress}`);
        await getProperty();
      } else {
        const res = await connectMetamask();
        if (res.success) {
          console.log(res);
          setAccountAddress(res.address);
        }
      }
    };

    fetchData();
  }, [accountAddress, setAccountAddress]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">My Properties</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-500">No properties found.</p>
        ) : (
          properties.map((property) => (
            <div
              key={property.id}
              className="mb-6 border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`https://salmon-wooden-sailfish-93.mypinata.cloud/ipfs/${property.image}`}
                alt={property.address}
                // width={400}
                // height={200}
                className="mb-4 w-full h-64 object-cover rounded"
              />
              <div className="text-gray-700">
                <p className="mb-2">
                  <strong>Address:</strong>{" "}
                  {decryptFromBytes32(property.address)}
                </p>
                <p className="mb-2">
                  <strong>Building Area:</strong> {property.luasBangunan} m²
                </p>
                <p className="mb-2">
                  <strong>Surface Area:</strong> {property.luasTanah} m²
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnProperty;
