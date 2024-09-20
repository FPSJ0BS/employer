export const TextInputValid = (inputValue: any) => {
  const regex = /^[A-Za-z\s]*$/; // \s allows whitespace characters including space
  return regex.test(inputValue);
};
