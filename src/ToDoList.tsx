import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("Email", { required: true })} placeholder="Email" />
        <input {...register("firstName")} placeholder="First Name" />
        <input {...register("lastName")} placeholder="Last Name" />
        <input
          {...register("userName", { required: true, minLength: 10 })}
          placeholder="User Name"
        />
        <input
          {...register("password", {
            required: "Password is required.",
            minLength: { value: 5, message: "Your password is too short." },
          })}
          placeholder="Password"
        />
        <input {...register("confirm")} placeholder="Confirm" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
