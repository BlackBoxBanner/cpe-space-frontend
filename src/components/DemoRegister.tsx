import {useRsaPublicKey} from "@/contexts/rsaContext";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {cn} from "@dookdiks/utils";
import {Button, ErrorMessage, Input} from "@/components/demo";
import {UserFormSchema, UserFormType} from "@/types/zodSchema";
import {register} from "@/lib/utils/auth/register";
import zod from "zod";
import {ChangeEvent} from "react";
import {upload} from "@/lib/utils/image/upload";
import {fileExtension} from "@/lib/utils/fileExtension";

// from byte to mb
const MAX_FILE_SIZE = 2 * 1000000
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ExtraUserFormSchema = zod.object({
  confirmPassword: zod.string(),
  image: zod.custom<File>()
    .refine(
      (file) => {
        // Check if all items in the array are instances of the File object
        return file instanceof File
      },
      {
        // If the refinement fails, throw an error with this message
        message: 'Expected a file',
      },
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size should be less than ${MAX_FILE_SIZE / 1000000}mb.`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only these types are allowed .jpg, .jpeg, .png and .webp',
    ).optional(),
})

const NewRegisterFormSchema = UserFormSchema.omit({image: true}).merge(ExtraUserFormSchema)
type NewRegisterFormType = zod.infer<typeof NewRegisterFormSchema>

const DemoRegister = () => {

  const {rsaKey} = useRsaPublicKey()
  const {control, handleSubmit, setError} = useForm<NewRegisterFormType>({
    resolver: zodResolver(NewRegisterFormSchema),
    defaultValues: {
      studentid: "64070503000",
      password: "password",
      confirmPassword: "password",
      email: "example@mail.com",
      phone: "0810000000",
      name: "John Doe",
      program: "INTERNATIONAL"
    }
  })

  const onSubmitHandler: SubmitHandler<NewRegisterFormType> = async (data, event) => {
    const image = data.image
    const imageName = `user-images/${data.studentid}_profile.${fileExtension(image?.name)}`

    const imageRes = data.image ? (await upload(data.image, imageName)) : null

    const res = await register({
      studentid: data.studentid,
      program: data.program,
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      image: imageRes?.data,
      publicKey: rsaKey
    })
    if (res.error) {
      setError("root", {message: res.error.customError ? res.error.customError : JSON.stringify(res.error.zodError)})
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={cn("border rounded border-black p-2")}>
        <Controller
          control={control}
          render={({field, fieldState: {error}}) => {
            return (
              <div>
                <Input placeholder={"studentid"} className={cn("border rounded border-black px-2")} {...field}/>
                <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
              </div>
            )
          }}
          name={"studentid"}
        />
        <Controller
          control={control}
          render={({field, fieldState: {error}}) => {
            return (
              <div>
                <Input placeholder={"password"} type={"password"}
                       className={cn("border rounded border-black px-2")} {...field}/>
                <ErrorMessage>{error ? error.message : ""}</ErrorMessage>

              </div>
            )
          }}
          name={"password"}
        />
        <Controller
          control={control}
          render={({field, fieldState: {error}}) => {
            return (
              <div>
                <Input placeholder={"confirmPassword"} type={"password"}
                       className={cn("border rounded border-black px-2")} {...field}/>
                <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
              </div>
            )
          }}
          name={"confirmPassword"}
        />
        <Controller
          control={control}
          render={({field, fieldState: {error}}) => {
            return (
              <div>
                <Input placeholder={"name"} className={cn("border rounded border-black px-2")} {...field}/>
                <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
              </div>
            )
          }}
          name={"name"}
        />
        <Controller
          control={control}
          render={({field, fieldState: {error}}) => {
            return (
              <div>
                <Input placeholder={"email"} type={"email"}
                       className={cn("border rounded border-black px-2")} {...field}/>
                <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
              </div>
            )
          }}
          name={"email"}
        />
        <Controller
          control={control}
          render={({field, fieldState: {error}}) => {
            return (
              <div>
                <Input placeholder={"phone"} type={"tel"}
                       className={cn("border rounded border-black px-2")} {...field}/>
                <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
              </div>
            )
          }}
          name={"phone"}
        />
        <Controller
          control={control}
          render={({field, fieldState: {error}}) => {
            return (
              <div>
                <select className={cn("border rounded border-black px-2")} {...field}>
                  <option value={"REGULAR"}>REGULAR</option>
                  <option value={"INTERNATIONAL"}>INTERNATIONAL</option>
                  <option value={"HEALTH_DATA_SCIENCE"}>HEALTH_DATA_SCIENCE</option>
                  <option value={"RESFENTIAL_COLLEGE"}>RESFENTIAL_COLLEGE</option>
                </select>
                <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
              </div>
            )
          }}
          name={"program"}
        />
        <Controller
          control={control}
          render={({field: {value, onChange, ...field}, fieldState: {error}}) => {
            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
              console.log(event.target.files)
              const fileList = event.target.files
              const file = fileList ? fileList[0] : null
              onChange(file)
            }
            return (
              <div>
                <Input placeholder={"image"} type={"file"} accept={"image/*"}
                       className={cn("border rounded border-black px-2")}
                       onChange={onChangeHandler}
                       {...field}/>
                <ErrorMessage>{error ? error.message : ""}</ErrorMessage>
              </div>
            )
          }}
          name={"image"}
        />
        <Button type={"submit"}>Submit</Button>
      </form>
    </>
  )
}

export default DemoRegister