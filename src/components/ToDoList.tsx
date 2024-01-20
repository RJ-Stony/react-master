import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { toDoState } from "./atoms";
import ToDo from "./ToDo";

const Title = styled.h1`
  padding: 10px 0px 0px 10px;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <Title>To Do List</Title>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
