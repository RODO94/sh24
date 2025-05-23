import "./ErrorBox.css";

export default function ErrorBox({
  errorMessage,
}: {
  errorMessage: string | null;
}) {
  return <p>{errorMessage}</p>;
}
