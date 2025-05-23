import { useState } from "react";
import "./App.css";
import ErrorBox from "./components/ErrorBox/ErrorBox";
import PostcodeInput from "./components/PostcodeInput/PostcodeInput";

function App() {
  const [errorMesage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
    setErrorMessage("This is an error message");
  };
  return (
    <main>
      <PostcodeInput handleSubmit={handleSubmit} />
      <ErrorBox errorMessage={errorMesage} />
    </main>
  );
}

export default App;
