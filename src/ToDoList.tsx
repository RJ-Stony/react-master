import { useForm } from "react-hook-form";

interface IForm {
  // 필수가 아닌 항목들에 대해서 ? 첨가
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
  confirm?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {};
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Only naver.com emails allowed.",
            },
          })}
          style={{
            borderColor: (errors.email?.message as string) ? "red" : "",
          }}
          placeholder="Email"
        />
        <span>{errors.email?.message as string}</span>
        <input {...register("firstName")} placeholder="First Name" />
        <input {...register("lastName")} placeholder="Last Name" />
        <input
          {...register("userName", {
            required: "User Name is required.",
            minLength: 10,
          })}
          style={{
            borderColor: (errors.userName?.message as string) ? "red" : "",
          }}
          placeholder="User Name"
        />
        <span>{errors.userName?.message as string}</span>
        <input
          {...register("password", {
            required: "Password is required.",
            minLength: { value: 5, message: "Your password is too short." },
          })}
          style={{
            borderColor: (errors.password?.message as string) ? "red" : "",
          }}
          placeholder="Password"
        />
        <span>{errors.password?.message as string}</span>
        <input {...register("confirm")} placeholder="Confirm" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
