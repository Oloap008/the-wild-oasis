import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, formState, getValues, clearErrors, reset } =
    useForm({
      mode: "onBlur",
    });
  const { errors } = formState;

  const { signup, isSigningUp } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isSigningUp}
          type="text"
          id="fullName"
          {...register("fullName", {
            onChange: () => {
              if (errors.fullName) clearErrors("fullName");
            },
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isSigningUp}
          type="email"
          id="email"
          {...register("email", {
            onChange: () => {
              if (errors.email) clearErrors("email");
            },
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a vild email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isSigningUp}
          type="password"
          id="password"
          {...register("password", {
            onChange: () => {
              if (errors.password) clearErrors("password");
            },
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm Password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          disabled={isSigningUp}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            onChange: () => {
              if (errors.passwordConfirm) clearErrors("passwordConfirm");
            },
            required: "This field is required",
            validate: (value) =>
              value === getValues().password ||
              "Passwords doesn't seem to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
