import { useState } from "react";
import "./App.css";
import ErrorBox from "./components/ErrorBox/ErrorBox";
import PostcodeInput from "./components/PostcodeInput/PostcodeInput";
import type {
  RequestError,
  RequestResponse,
  RequestSuccess,
} from "./types/requests";
import { checkPostcode } from "./requests/checkPostcode";
import SuccessBox from "./components/SuccessBox/SuccessBox";

function App() {
  const [errorMesage, setErrorMessage] = useState<RequestError | null>(null);
  const [successMesage, setSuccessMessage] = useState<RequestSuccess | null>(
    null
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // @ts-expect-error
    // Ignore to speed up ts development
    const value: string = event.target[0].value;

    const response: RequestResponse = await checkPostcode(value);
    if (!response.isSuccess) {
      setSuccessMessage(null);
      setErrorMessage(response);
      return;
    }

    if (response.isSuccess) {
      setErrorMessage(null);
      setSuccessMessage(response);
    }
  };

  console.log(errorMesage);
  return (
    <main>
      <PostcodeInput handleSubmit={handleSubmit} />
      <ErrorBox errorMessage={errorMesage} />
      <SuccessBox successMessage={successMesage} />
    </main>
  );
}

export default App;
