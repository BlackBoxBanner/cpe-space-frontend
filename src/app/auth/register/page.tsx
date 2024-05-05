'use client';

import { Button } from '@/components/common/button';
import { useRef } from 'react';
import { upload } from '@/libs/utils/image/upload';
import { fileExtension } from '@/libs/utils/fileExtension';
import { registerAction } from '@/action/auth';

const RegisterPage = () => {
  const ref = useRef<HTMLFormElement>(null);

  const registerClientAction = async (formData: FormData) => {
    const imageFile = formData.get('image') as File;

    const studentid = formData.get('studentid') as string;

    const imageUrl = await upload(
      imageFile,
      `profile/${studentid}.${fileExtension(imageFile.name)}`,
    );

    if (imageUrl.error) {
      alert('Error - Image not uploaded');
      return;
    }

    const actionData = await registerAction(formData, imageUrl.data);

    if (actionData) {
      alert('User Created');
      ref.current?.reset();
    } else {
      alert('Error - User not created');
    }
  };
  return (
    <>
      <div className="text-[4rem]">Register</div>
      <form
        ref={ref}
        className="flex flex-col gap-2 w-full"
        action={registerClientAction}
      >
        <input
          className="p-1 rounded"
          type="text"
          placeholder="Name"
          name="name"
          required
        />
        <input
          className="p-1 rounded"
          type="text"
          placeholder="Student ID"
          name="studentid"
          pattern="[0-9]{11}"
          required
        />
        <input
          className="p-1 rounded"
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <select
          className="p-1 rounded"
          name="program"
          required
          defaultValue={'REGULAR'}
        >
          <option value="REGULAR">Regular</option>
          <option value="INTERNATIONAL">International</option>
          <option value="HEALTH_DATA_SCIENCE">Health Data Science</option>
          <option value="RESFENTIAL_COLLEGE">Residential College</option>
        </select>
        <select className="p-1 rounded" name="class" required>
          {Array.from({ length: 100 }, (_, index) => index + 1).map(
            (_, index) => {
              return (
                <option key={index} value={`CPE ${index}`}>
                  {`CPE ${index}`}
                </option>
              );
            },
          )}
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          id="image-register-input"
        />
        <Button type="submit" buttonStyle={{}}>
          Create User
        </Button>
      </form>
    </>
  );
};

export default RegisterPage;
