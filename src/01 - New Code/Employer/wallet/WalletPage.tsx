import React, { useEffect, useState } from "react";
import { Card, Box } from "@mui/material";
import { postPaymentOrder } from "../../../api/apiAxios";
import { useDispatch, useSelector } from "react-redux";
import { WalletDataInterface, setWalletData } from "../Redux/Wallet";

const WalletPage = () => {
  const [orderId, setOrderId] = useState("");
  const [razorpay_payment_idValue, setRazorpay_payment_idValue] = useState("");
  const [razorpay_order_idValue, setRazorpay_order_idValue] = useState("");
  const [razorpay_signatureValue, setRazorpay_signatureValue] = useState("");
  const [amount, setAmount] = useState(0);
  const { walletDetailsData } = useSelector((state: any) => state.wallet);
  const [walletData, setWalletAllData] = useState<any>([]);
  const dispatch = useDispatch();
  const razorPayOptions = {
    key: "rzp_test_b0v88dK7Jg9OPa",
    // key: "rzp_live_eoNE0pukX4o3zA",
    amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "FPS JOBS",
    description: "Live Transaction",
    image: "https://rzp-mobile.s3.amazonaws.com/images/rzp.png",
    order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: async function (response: any) {
      // console.log(response.razorpay_payment_id);
      // console.log(response.razorpay_order_id);
      // console.log(response.razorpay_signature);
      await setRazorpay_payment_idValue(response.razorpay_payment_id);
      await setRazorpay_order_idValue(response.razorpay_order_id);
      await setRazorpay_signatureValue(response.razorpay_signature);
      const _data: any = {
        dateTransaction: String(new Date()),
        typeTransaction: "Purchased Coins",
        Status: "Credit",
        amountCoins: amount,
        purchasedCoins:
          Number(
            walletDetailsData?.currentBalance
              ? walletDetailsData?.currentBalance
              : 0
          ) - 100,
        currentBalance:
          Number(walletDetailsData?.currentBalance) + Number(amount),
        bonusCoins: "100",
      };

      localStorage.setItem("wallet", JSON.stringify({ ..._data }));
      dispatch(setWalletData({ ..._data }));
      // setWalletDetailsData({ ...walletDetailsData, ..._data });
      const _walletData: any = [...walletData, _data];
      setWalletAllData(_walletData);
      console.log(_walletData);
      localStorage.setItem("walletData", JSON.stringify(_walletData));
    },
    //  prefill: {
    //    //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
    //    name: empName, //your customer's name
    //    email: empEmail,
    //    contact: empNumber, //Provide the customer's phone number for better conversion rates
    //  },
    theme: {
      color: "#a83359",
    },
  };

  const handlePayment = async (amount: number) => {
    // setAmount(amount);
    // const _data: any = {
    //   dateTransaction: String(new Date()),
    //   typeTransaction: "Purchased Coins",
    //   Status: "Credit",
    //   amountCoins: amount,
    //   purchasedCoins:
    //     Number(
    //       walletDetailsData?.currentBalance
    //         ? walletDetailsData?.currentBalance
    //         : 0
    //     ) - 100,
    //   currentBalance:
    //     Number(walletDetailsData?.currentBalance) + Number(amount),
    //   bonusCoins: "100",
    // };

    // localStorage.setItem("wallet", JSON.stringify({ ..._data }));
    // dispatch(setWalletData({ ..._data }));
    // // setWalletDetailsData({ ...walletDetailsData, ..._data });
    // const _walletData: any = [...walletData, _data];
    // setWalletAllData(_walletData);
    // console.log(_walletData);
    // localStorage.setItem("walletData", JSON.stringify(_walletData));

    try {
      const amountString = parseInt(amount) * 100;
      console.log(amountString);
      const res = await postPaymentOrder(amountString);

      if (res?.data?.status) {
        setAmount(amount);
        const data = await res?.data?.data[0];
        const { order_id } = data;
        const idToString = await order_id;
        await setOrderId(idToString);
        //  const price = await employerPackageFields.price.toString();
       setAmount(price);
      } else {
        return;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const _parse = localStorage.getItem("wallet");
    const parse = localStorage.getItem("walletData");
    if (_parse) {
      dispatch(setWalletData(JSON.parse(_parse || "")));
    }
    if (parse) {
      setWalletAllData(JSON.parse(parse || ""));
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      openRazorPay(); // Call openRazorPay only if orderId is truthy
    }
  }, [orderId]);

  const openRazorPay = () => {
    var rzp1 = new window.Razorpay(razorPayOptions);
    rzp1.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  return (
    <Box className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-center p-4 space-y-4 md:space-y-0 md:space-x-4 bg-zinc-100 dark:bg-zinc-900">
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 p-6 rounded-lg shadow-lg text-white w-full md:w-1/3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Available Coins</h2>
              <p className="text-3xl font-bold mt-2 text-white">
                {walletDetailsData?.currentBalance
                  ? walletDetailsData?.currentBalance
                  : "0"}
              </p>
              {/* <p className="mt-2 flex items-center text-white">
                Bonus{" "}
                {walletDetailsData?.bonusCoins
                  ? walletDetailsData?.bonusCoins
                  : "0"}
              </p> */}
              {/* <p className="mt-2 flex items-center text-white">
                Purchased{" "}
                {walletDetailsData?.purchasedCoins
                  ? walletDetailsData?.purchasedCoins
                  : "0"}
              </p> */}
            </div>
            <div>
              <img
                src="https://placehold.co/50x50?text=wallet"
                alt="wallet"
                className="w-16 h-16"
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center">
              Choose Your Plan
            </h2>
            {/* <p className="text-sm italic">All prices inclusive of GST</p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">Starter Pack</h3>
              <div className="flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  viewBox="0 0 24 24"
                  id="coin"
                  className="w-8 h-8 text-yellow-500"
                  fill="#eab308"
                >
                  <g>
                    <path d="M16.5137 7.7842c.0791.4829.4971.8369.9863.8369s.9072-.354.9863-.8369c.1104-.6665.6318-1.188 1.2969-1.2974.4834-.0796.8379-.4971.8379-.9868s-.3545-.9072-.8379-.9868c-.665-.1094-1.1865-.6309-1.2969-1.2974C18.4072 2.7329 17.9893 2.3789 17.5 2.3789s-.9072.354-.9863.8369c-.1104.6665-.6318 1.188-1.2969 1.2974C14.7334 4.5928 14.3789 5.0103 14.3789 5.5s.3545.9072.8379.9868C15.8818 6.5962 16.4033 7.1177 16.5137 7.7842zM17.5 5.4756c.0078.0083.0166.0161.0244.0244C17.5166 5.5083 17.5078 5.5161 17.5 5.5244 17.4922 5.5161 17.4834 5.5083 17.4756 5.5 17.4834 5.4917 17.4922 5.4839 17.5 5.4756zM7.1631 10.5288C5.0645 11.042 4 11.8735 4 13v3 3c0 .5244.2588 1.2783 1.4961 1.896C6.8896 21.5874 9.3213 22 12 22s5.1104-.4126 6.5059-1.1055C19.7412 20.2783 20 19.5244 20 19v-3-3c0-1.1265-1.0645-1.958-3.1484-2.4678C15.5127 10.1841 13.835 10 12 10S8.4873 10.1841 7.1631 10.5288zM10.9948 15.9744C11.4857 15.9967 11.8506 16 12 16c.1494 0 .5144-.0032 1.0056-.0256 1.1248-.0433 2.1649-.1591 3.0825-.3416.4239-.0798.8411-.1785 1.2426-.2969.0616-.0181.1241-.0359.1837-.0546.1161-.0367.2283-.0759.3398-.1165.0473-.0171.1002-.0325.1459-.05v.7498c-.0203.0184-.0596.0444-.0933.0682-.0251.0178-.0408.0322-.074.0525-.0471.0287-.1197.0631-.1842.0959-.0456.0232-.0789.0439-.1339.0686-.0826.0371-.1961.0773-.3015.1167-.0643.024-.1129.0468-.1862.0714-.1932.0646-.4176.1303-.6792.1943C15.1885 16.834 13.6445 17 12 17s-3.1885-.166-4.3623-.4712c-.2587-.0634-.4811-.1287-.6727-.193-.0587-.0197-.0963-.0379-.1491-.0573-.1197-.044-.2424-.0885-.334-.1298-.0491-.0222-.0782-.0406-.1198-.0615-.0698-.0352-.1456-.0717-.1956-.1022-.0322-.0197-.0474-.0337-.072-.0511C6.0602 15.9095 6.0206 15.8834 6 15.8646v-.7488c.0526.0202.1131.038.1678.0576.0972.035.1946.0691.2952.1013.0747.0237.1532.0461.2313.0688.3951.1154.8049.212 1.2211.2902C8.8363 15.816 9.8746 15.9313 10.9948 15.9744zM18 18.8623c-.0557.0493-.1699.1348-.3848.2417C16.5176 19.6484 14.3135 20 12 20s-4.5176-.3516-5.6133-.8945C6.1709 18.9976 6.0557 18.9116 6 18.8623v-.7466c.0889.0341.1887.0649.2834.0972.0633.0216.1235.0442.1893.0649.2128.0671.4356.1312.6757.1899C8.4873 18.8159 10.165 19 12 19s3.5127-.1841 4.8369-.5288c.2424-.0592.4674-.1238.6821-.1915.0656-.0207.1253-.0431.1883-.0646.098-.0333.201-.0652.2927-.1004V18.8623zM17.8068 12.9987c-.2458.1462-.6942.3463-1.4592.5335-.2659.0692-.5567.1293-.8596.1838-.0573.0101-.1146.0201-.1737.0299-.248.0414-.5092.0764-.7762.108-.0895.0106-.1741.0224-.2668.032-.2802.0289-.5713.0502-.8665.0681-.0784.0048-.1496.0123-.2298.0162C12.7917 13.9894 12.3992 14 12 14c-.3995 0-.7924-.0106-1.1762-.0298-.0764-.0038-.144-.0109-.2187-.0154-.3007-.0181-.5972-.04-.8828-.0696-.0861-.0089-.165-.02-.2484-.0298-.2765-.0325-.5468-.0687-.8037-.112-.0529-.0088-.1044-.0178-.1558-.0269-.3085-.0554-.6046-.1169-.8767-.1877-.7546-.1849-1.1997-.384-1.4446-.53.2473-.1455.7004-.3455 1.4592-.5311C8.8115 12.166 10.3555 12 12 12s3.1885.166 4.3623.4712C17.1113 12.6548 17.5605 12.8531 17.8068 12.9987z"></path>
                  </g>
                </svg>
                <p className="text-2xl font-bold  text-black">100</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-2 rounded-lg"
                  onClick={() => handlePayment(10)}
                >
                  Buy Now
                </button>
                <p className="mt-2 text-blue-500">₹ 10</p>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">Bronze</h3>
              <div className="flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  viewBox="0 0 24 24"
                  id="coin"
                  className="w-8 h-8 text-yellow-500"
                  fill="#eab308"
                >
                  <g>
                    <path d="M16.5137 7.7842c.0791.4829.4971.8369.9863.8369s.9072-.354.9863-.8369c.1104-.6665.6318-1.188 1.2969-1.2974.4834-.0796.8379-.4971.8379-.9868s-.3545-.9072-.8379-.9868c-.665-.1094-1.1865-.6309-1.2969-1.2974C18.4072 2.7329 17.9893 2.3789 17.5 2.3789s-.9072.354-.9863.8369c-.1104.6665-.6318 1.188-1.2969 1.2974C14.7334 4.5928 14.3789 5.0103 14.3789 5.5s.3545.9072.8379.9868C15.8818 6.5962 16.4033 7.1177 16.5137 7.7842zM17.5 5.4756c.0078.0083.0166.0161.0244.0244C17.5166 5.5083 17.5078 5.5161 17.5 5.5244 17.4922 5.5161 17.4834 5.5083 17.4756 5.5 17.4834 5.4917 17.4922 5.4839 17.5 5.4756zM7.1631 10.5288C5.0645 11.042 4 11.8735 4 13v3 3c0 .5244.2588 1.2783 1.4961 1.896C6.8896 21.5874 9.3213 22 12 22s5.1104-.4126 6.5059-1.1055C19.7412 20.2783 20 19.5244 20 19v-3-3c0-1.1265-1.0645-1.958-3.1484-2.4678C15.5127 10.1841 13.835 10 12 10S8.4873 10.1841 7.1631 10.5288zM10.9948 15.9744C11.4857 15.9967 11.8506 16 12 16c.1494 0 .5144-.0032 1.0056-.0256 1.1248-.0433 2.1649-.1591 3.0825-.3416.4239-.0798.8411-.1785 1.2426-.2969.0616-.0181.1241-.0359.1837-.0546.1161-.0367.2283-.0759.3398-.1165.0473-.0171.1002-.0325.1459-.05v.7498c-.0203.0184-.0596.0444-.0933.0682-.0251.0178-.0408.0322-.074.0525-.0471.0287-.1197.0631-.1842.0959-.0456.0232-.0789.0439-.1339.0686-.0826.0371-.1961.0773-.3015.1167-.0643.024-.1129.0468-.1862.0714-.1932.0646-.4176.1303-.6792.1943C15.1885 16.834 13.6445 17 12 17s-3.1885-.166-4.3623-.4712c-.2587-.0634-.4811-.1287-.6727-.193-.0587-.0197-.0963-.0379-.1491-.0573-.1197-.044-.2424-.0885-.334-.1298-.0491-.0222-.0782-.0406-.1198-.0615-.0698-.0352-.1456-.0717-.1956-.1022-.0322-.0197-.0474-.0337-.072-.0511C6.0602 15.9095 6.0206 15.8834 6 15.8646v-.7488c.0526.0202.1131.038.1678.0576.0972.035.1946.0691.2952.1013.0747.0237.1532.0461.2313.0688.3951.1154.8049.212 1.2211.2902C8.8363 15.816 9.8746 15.9313 10.9948 15.9744zM18 18.8623c-.0557.0493-.1699.1348-.3848.2417C16.5176 19.6484 14.3135 20 12 20s-4.5176-.3516-5.6133-.8945C6.1709 18.9976 6.0557 18.9116 6 18.8623v-.7466c.0889.0341.1887.0649.2834.0972.0633.0216.1235.0442.1893.0649.2128.0671.4356.1312.6757.1899C8.4873 18.8159 10.165 19 12 19s3.5127-.1841 4.8369-.5288c.2424-.0592.4674-.1238.6821-.1915.0656-.0207.1253-.0431.1883-.0646.098-.0333.201-.0652.2927-.1004V18.8623zM17.8068 12.9987c-.2458.1462-.6942.3463-1.4592.5335-.2659.0692-.5567.1293-.8596.1838-.0573.0101-.1146.0201-.1737.0299-.248.0414-.5092.0764-.7762.108-.0895.0106-.1741.0224-.2668.032-.2802.0289-.5713.0502-.8665.0681-.0784.0048-.1496.0123-.2298.0162C12.7917 13.9894 12.3992 14 12 14c-.3995 0-.7924-.0106-1.1762-.0298-.0764-.0038-.144-.0109-.2187-.0154-.3007-.0181-.5972-.04-.8828-.0696-.0861-.0089-.165-.02-.2484-.0298-.2765-.0325-.5468-.0687-.8037-.112-.0529-.0088-.1044-.0178-.1558-.0269-.3085-.0554-.6046-.1169-.8767-.1877-.7546-.1849-1.1997-.384-1.4446-.53.2473-.1455.7004-.3455 1.4592-.5311C8.8115 12.166 10.3555 12 12 12s3.1885.166 4.3623.4712C17.1113 12.6548 17.5605 12.8531 17.8068 12.9987z"></path>
                  </g>
                </svg>
                <p className="text-2xl font-bold text-black">5000</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                {" "}
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-2 rounded-lg"
                  onClick={() => handlePayment(5000)}
                >
                  Buy Now
                </button>
                <p className="mt-2 text-blue-500">₹ 5000</p>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">Silver</h3>
              <div className="flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  viewBox="0 0 24 24"
                  id="coin"
                  className="w-8 h-8 text-yellow-500"
                  fill="#eab308"
                >
                  <g>
                    <path d="M16.5137 7.7842c.0791.4829.4971.8369.9863.8369s.9072-.354.9863-.8369c.1104-.6665.6318-1.188 1.2969-1.2974.4834-.0796.8379-.4971.8379-.9868s-.3545-.9072-.8379-.9868c-.665-.1094-1.1865-.6309-1.2969-1.2974C18.4072 2.7329 17.9893 2.3789 17.5 2.3789s-.9072.354-.9863.8369c-.1104.6665-.6318 1.188-1.2969 1.2974C14.7334 4.5928 14.3789 5.0103 14.3789 5.5s.3545.9072.8379.9868C15.8818 6.5962 16.4033 7.1177 16.5137 7.7842zM17.5 5.4756c.0078.0083.0166.0161.0244.0244C17.5166 5.5083 17.5078 5.5161 17.5 5.5244 17.4922 5.5161 17.4834 5.5083 17.4756 5.5 17.4834 5.4917 17.4922 5.4839 17.5 5.4756zM7.1631 10.5288C5.0645 11.042 4 11.8735 4 13v3 3c0 .5244.2588 1.2783 1.4961 1.896C6.8896 21.5874 9.3213 22 12 22s5.1104-.4126 6.5059-1.1055C19.7412 20.2783 20 19.5244 20 19v-3-3c0-1.1265-1.0645-1.958-3.1484-2.4678C15.5127 10.1841 13.835 10 12 10S8.4873 10.1841 7.1631 10.5288zM10.9948 15.9744C11.4857 15.9967 11.8506 16 12 16c.1494 0 .5144-.0032 1.0056-.0256 1.1248-.0433 2.1649-.1591 3.0825-.3416.4239-.0798.8411-.1785 1.2426-.2969.0616-.0181.1241-.0359.1837-.0546.1161-.0367.2283-.0759.3398-.1165.0473-.0171.1002-.0325.1459-.05v.7498c-.0203.0184-.0596.0444-.0933.0682-.0251.0178-.0408.0322-.074.0525-.0471.0287-.1197.0631-.1842.0959-.0456.0232-.0789.0439-.1339.0686-.0826.0371-.1961.0773-.3015.1167-.0643.024-.1129.0468-.1862.0714-.1932.0646-.4176.1303-.6792.1943C15.1885 16.834 13.6445 17 12 17s-3.1885-.166-4.3623-.4712c-.2587-.0634-.4811-.1287-.6727-.193-.0587-.0197-.0963-.0379-.1491-.0573-.1197-.044-.2424-.0885-.334-.1298-.0491-.0222-.0782-.0406-.1198-.0615-.0698-.0352-.1456-.0717-.1956-.1022-.0322-.0197-.0474-.0337-.072-.0511C6.0602 15.9095 6.0206 15.8834 6 15.8646v-.7488c.0526.0202.1131.038.1678.0576.0972.035.1946.0691.2952.1013.0747.0237.1532.0461.2313.0688.3951.1154.8049.212 1.2211.2902C8.8363 15.816 9.8746 15.9313 10.9948 15.9744zM18 18.8623c-.0557.0493-.1699.1348-.3848.2417C16.5176 19.6484 14.3135 20 12 20s-4.5176-.3516-5.6133-.8945C6.1709 18.9976 6.0557 18.9116 6 18.8623v-.7466c.0889.0341.1887.0649.2834.0972.0633.0216.1235.0442.1893.0649.2128.0671.4356.1312.6757.1899C8.4873 18.8159 10.165 19 12 19s3.5127-.1841 4.8369-.5288c.2424-.0592.4674-.1238.6821-.1915.0656-.0207.1253-.0431.1883-.0646.098-.0333.201-.0652.2927-.1004V18.8623zM17.8068 12.9987c-.2458.1462-.6942.3463-1.4592.5335-.2659.0692-.5567.1293-.8596.1838-.0573.0101-.1146.0201-.1737.0299-.248.0414-.5092.0764-.7762.108-.0895.0106-.1741.0224-.2668.032-.2802.0289-.5713.0502-.8665.0681-.0784.0048-.1496.0123-.2298.0162C12.7917 13.9894 12.3992 14 12 14c-.3995 0-.7924-.0106-1.1762-.0298-.0764-.0038-.144-.0109-.2187-.0154-.3007-.0181-.5972-.04-.8828-.0696-.0861-.0089-.165-.02-.2484-.0298-.2765-.0325-.5468-.0687-.8037-.112-.0529-.0088-.1044-.0178-.1558-.0269-.3085-.0554-.6046-.1169-.8767-.1877-.7546-.1849-1.1997-.384-1.4446-.53.2473-.1455.7004-.3455 1.4592-.5311C8.8115 12.166 10.3555 12 12 12s3.1885.166 4.3623.4712C17.1113 12.6548 17.5605 12.8531 17.8068 12.9987z"></path>
                  </g>
                </svg>
                <p className="text-2xl font-bold text-black">10000</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-2 rounded-lg"
                  onClick={() => handlePayment(9600)}
                >
                  Buy Now
                </button>
                <p className="mt-2 text-blue-500">₹ 9600</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Grid container spacing={2} className="mt-4">
        <Grid item xs={12} md={6}>
          <StyledCard className="p-4">
            <Typography variant="h6" className="mb-2">
              Purchase History
            </Typography>
            <Typography variant="body1" className="text-center">
              No Purchases yet!
            </Typography>
          </StyledCard>
        </Grid>
      </Grid> */}
      <div className="p-4 bg-card text-card-foreground rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <img
            aria-hidden="true"
            alt="report-icon"
            src="https://openui.fly.dev/openui/24x24.svg?text=📄"
            className="mr-2"
          />
          <h2 className="text-lg font-semibold">Consumption Report</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-700">
                <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                  SL. No
                </th>
                <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                  Date of the Transaction
                </th>
                <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                  Type of Transaction
                </th>

                <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                  Status
                </th>
                <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                  Amount(FPS Coins)
                </th>
                <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                  Current Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {walletData && walletData.length > 0 ? (
                <>
                  {walletData.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                        {new Date(item?.dateTransaction).toLocaleDateString(
                          "default",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                        {item?.typeTransaction}
                      </td>
                      <td className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                        {item?.Status}
                      </td>
                      <td className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 text-green-500">
                        {item?.amountCoins}
                      </td>
                      <td className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                        {item?.currentBalance}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                "No Data Found!"
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Box>
  );
};
export default WalletPage;
