import type { RequestError } from "../../types/requests";
import "./ErrorBox.css";

export default function ErrorBox({
  errorMessage,
}: {
  errorMessage: RequestError | null;
}) {
  return <p>{errorMessage?.error.message}</p>;
}
