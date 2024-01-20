import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  align-items: center;
  justify-content: center;
  display: flex;
`;

const ToDoInput = styled.input`
  margin: 3px 5px 0px 10px;
  border-radius: 5px;
  padding: 3px 0px 3px 5px;
`;

const SubmitButton = styled.button`
  border-radius: 5px;
  background-color: #f97777;
  color: white;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <ToDoInput
        {...register("toDo", { required: "Please write a To Do." })}
        placeholder="해야 할 일을 적어주세욧!"
      />
      <SubmitButton>추가</SubmitButton>
    </Form>
  );
}

export default CreateToDo;
