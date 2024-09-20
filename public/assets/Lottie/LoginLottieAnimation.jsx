import { useState, useEffect } from 'react';
import LoginImage from '../../assets/Tablet login-pana.svg'

export const LoginLottieAnimation = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if the animation has not been loaded yet
    if (!hasLoaded) {
      // Set the state to indicate that the animation has been loaded
      setHasLoaded(true);
    }
  }, [hasLoaded]);

  // Render the iframe regardless of whether it has loaded before or not
  return (
    <iframe
      className="mt-[100px]"
      width="500px"
      height="500px"
      src={LoginImage}
    ></iframe>
  );
};
