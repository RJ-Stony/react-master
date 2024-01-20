import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "./atoms";
import ToDo from "./ToDo";

const Title = styled.h1`
  padding: 10px 0px 0px 10px;
`;

const Selector = styled.select`
  margin-left: 10px;
  border-radius: 5px;
`;

const Options = styled.option`
  text-align: center;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <Title>투두리스트</Title>
      <hr />
      <Selector value={category} onInput={onInput}>
        <Options value={Categories.TO_DO}>할 일</Options>
        <Options value={Categories.DOING}>하는 일</Options>
        <Options value={Categories.DONE}>한 일</Options>
      </Selector>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
