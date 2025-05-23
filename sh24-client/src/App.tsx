import { useState } from "react";
import "./App.css";
import ErrorBox from "./components/ErrorBox/ErrorBox";
import PostcodeInput from "./components/PostcodeInput/PostcodeInput";
import type { RequestError } from "./types/requests";

function App() {
  const [errorMesage, setErrorMessage] = useState<RequestError | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
    setErrorMessage({
      isSuccess: false,
      error: { type: "input", message: "Invalid postcode" },
    });
  };
  return (
    <main>
      <PostcodeInput handleSubmit={handleSubmit} />
      <ErrorBox errorMessage={errorMesage} />
    </main>
  );
}

export default App;
