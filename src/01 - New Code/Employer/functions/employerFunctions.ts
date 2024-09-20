export const TextInputValidEmployer = (inputValue: any) => {
  const regex = /^[A-Za-z\s]*$/; 
  return regex.test(inputValue);
};

export const TextInputEmailValidEmployer = (inputValue: any) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(inputValue);
};
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phoneNumber);
};

export const validatePassword = (password: string): boolean => {

  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,15}$/;
  return regex.test(password);
};

export const validateOTP = (otp: string): boolean => {
  const regex = /^\d{6}$/;
  return regex.test(otp);
};
 export const isValidNumber = (value: any) => {
   // Regular expression to allow only numeric values without e, +, -
   const regex = /^[0-9]/;
   return regex.test(value);
 };
