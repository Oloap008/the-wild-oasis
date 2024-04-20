import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isUpdatingUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  // No need to e.preventDefault() since the button is a type="reset"
  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          disabled={isUpdatingUser}
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdatingUser}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdatingUser}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
