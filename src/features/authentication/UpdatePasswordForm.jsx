import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, clearErrors, reset } =
    useForm({
      reValidateMode: "onBlur",
    });
  const { errors } = formState;

  const { updateUser, isUpdatingUser } = useUpdateUser();

  function onSuccess({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSuccess)}>
      <FormRow
        label="New Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isUpdatingUser}
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            onChange: () => {
              if (errors.password) clearErrors("password");
            },
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          disabled={isUpdatingUser}
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          {...register("passwordConfirm", {
            onChange: () => {
              if (errors.passwordConfirm) clearErrors("passwordConfirm");
            },
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={reset}
          $variation="secondary"
          type="reset"
          disabled={isUpdatingUser}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
