import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // func runs when things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { name, type, value } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      // eslint-disable-next-line prefer-destructuring
      value = e.target.files[0];
      //   [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.entries(inputs).map(([key, value]) => [key, '']);
    const blankFormObject = Object.fromEntries(blankState);

    setInputs(blankFormObject);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
