import "./App.css";
import ErrorBox from "./components/ErrorBox/ErrorBox";
import PostcodeInput from "./components/PostcodeInput/PostcodeInput";

function App() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };
  return (
    <main>
      <PostcodeInput handleSubmit={handleSubmit} />
      <ErrorBox />
    </main>
  );
}

export default App;
