import React, { useEffect } from "react";
export const Price = ({ indiPrice, setIndiPrice, packageOptions }) => {
  useEffect(() => {
    const inPrice = packageOptions[0]?.price;
    console.log('inprice', inPrice);
    if (inPrice) {
      setIndiPrice(parseInt(inPrice));
    }
  }, [packageOptions]);

  return (
    <>
      <h3 className=" text-[45px] text-[#293756]">{indiPrice}</h3>
    </>
  );
};
