import { useForm } from "react-hook-form";

interface IForm {
  // 필수가 아닌 항목들에 대해서 ? 첨가
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
  confirm: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.confirm) {
      setError(
        "confirm",
        { message: "Password are not the same." },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server Offline." });
  };

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
            borderColor: errors?.email?.message ? "red" : "",
          }}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "Write Here.",
            validate: {
              noJun: (value) => !value?.includes("Jun") || "No Jun Allowed",
              noSeok: (value) => !value?.includes("Seok") || "No Seok Allowed",
            },
          })}
          style={{
            borderColor: errors?.firstName?.message ? "red" : "",
          }}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName")} placeholder="Last Name" />
        <input
          {...register("userName", {
            required: "User Name is required.",
            minLength: 10,
          })}
          style={{
            borderColor: errors?.userName?.message ? "red" : "",
          }}
          placeholder="User Name"
        />
        <span>{errors?.userName?.message}</span>
        <input
          {...register("password", {
            required: "Password is required.",
            minLength: { value: 5, message: "Your password is too short." },
          })}
          style={{
            borderColor: errors?.password?.message ? "red" : "",
          }}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("confirm", { required: "Password is required." })}
          style={{
            borderColor: errors?.confirm?.message ? "red" : "",
          }}
          placeholder="Confirm"
        />
        <span>{errors?.confirm?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
