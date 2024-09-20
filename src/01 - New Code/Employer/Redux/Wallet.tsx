import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface WalletDataInterface {
  dateTransaction: string;
  typeTransaction: string;
  Status: string;
  amountCoins: string;
  currentBalance: string;
  purchasedCoins: string;
  bonusCoins: string;
}

interface EmployerEditJobType {
  walletDetailsData: WalletDataInterface;
}

// Define the initial state
const initialState: EmployerEditJobType = {
  walletDetailsData: {} as WalletDataInterface,
};

// Create the slice
export const wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletData: (
      state,
      action: PayloadAction<WalletDataInterface> // Action to set states data
    ) => {
      state.walletDetailsData = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setWalletData } = wallet.actions;

export default wallet.reducer;
