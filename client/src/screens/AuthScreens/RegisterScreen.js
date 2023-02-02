import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";

const RegisterScreen = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="fullname"
        ref={register({ required: true, minLength: 5, maxLength: 20 })}
        placeholder="Enter your full name"
      />
      {errors.fullname && <p className="error-msg">Fullname is required</p>}
      <input
        type="email"
        name="email"
        ref={register({ required: true })}
        placeholder="Enter your email"
      />
      {errors.email && <p className="error-msg">Email is required</p>}

      <input
        type="password"
        name="password"
        ref={register({ required: true })}
        placeholder="Enter your password"
      />
      {errors.password && <p className="error-msg">Password is required</p>}
      <Button className="btn primary btn-lg">Register</Button>
    </form>
  );
};

export default RegisterScreen;
