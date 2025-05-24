import type { RequestSuccess } from "../../types/requests";
import "./SuccessBox.css";

export default function SuccessBox({
  successMessage,
}: {
  successMessage: RequestSuccess | null;
}) {
  return (
    successMessage && (
      <section className='success'>
        <h2 className='success__heading'>Success</h2>
        <p className='success_message'>{successMessage?.data.message}</p>
      </section>
    )
  );
}
