import type { RequestError } from "../../types/requests";
import "./ErrorBox.css";

export default function ErrorBox({
  errorMessage,
}: {
  errorMessage: RequestError | null;
}) {
  return (
    errorMessage && (
      <section className='error'>
        <h2 className='error__heading'>Error</h2>
        <p className='error_message'>{errorMessage?.error.message}</p>
      </section>
    )
  );
}
