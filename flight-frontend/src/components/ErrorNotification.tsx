import { useEffect } from "react";

const ErrorNotification = ({
  errorMessage,
  setErrorMessage,
}: {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    if(errorMessage){
      const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    return () => clearTimeout(timeout)
  }
  })
  
  return (
    <div>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </div>
  );
};

export default ErrorNotification