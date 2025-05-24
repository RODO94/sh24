import { useState } from "react";
import "./App.css";
import ErrorBox from "./components/ErrorBox/ErrorBox";
import PostcodeInput from "./components/PostcodeInput/PostcodeInput";
import type { RequestError } from "./types/requests";
import { checkPostcode } from "./requests/checkPostcode";

function App() {
  const [errorMesage, setErrorMessage] = useState<RequestError | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log(event.target[0].value);
    setErrorMessage({
      isSuccess: false,
      error: { type: "input", message: "Invalid postcode" },
    });
    const response = await checkPostcode(event.target[0].value);
    console.log(response);
  };
  return (
    <main>
      <PostcodeInput handleSubmit={handleSubmit} />
      <ErrorBox errorMessage={errorMesage} />
    </main>
  );
}

export default App;
