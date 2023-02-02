const initValidations = () => {
  const errorRequired = "Required";
  const errorValid = "Please, enter valid data";

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = errorRequired;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = errorValid;
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = errorRequired;
    } else if (!/(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(value)) {
      error = errorValid;
    }
    return error;
  };

  return {
    validateEmail,
    validatePassword,
  };
};

export const validationRules = initValidations();
