import { useState } from "react";
import "./PostcodeInput.css";

export default function PostcodeInput({
  handleSubmit,
}: {
  handleSubmit: (event: React.FormEvent) => void;
}) {
  const [postcode, setPostcode] = useState("");
  return (
    <form className='postcode-form' onSubmit={handleSubmit}>
      <label
        id='postcode-label'
        htmlFor='postcode'
        className='postcode-form__label'
      >
        Enter a postcode
        <input
          id='postcode'
          name='postcode'
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className='postcode-form__input'
          aria-describedby='postcode-label'
          type='text'
        />
      </label>
      <button className='postcode-form__button' type='submit'>
        Submit postcode
      </button>
    </form>
  );
}
