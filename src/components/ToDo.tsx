import styled from "styled-components";
import { IToDo } from "./atoms";

const ToDosContainer = styled.li`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.span`
  padding: 5px;
  border: 1px solid lightcoral;
  border-radius: 5px;
  margin-right: 5px;
`;

const ButtonContainer = styled.span``;

const StateButton = styled.button`
  border-radius: 5px;
`;

function ToDo({ text }: IToDo) {
  return (
    <ToDosContainer>
      <TextContainer>{text}</TextContainer>
      <ButtonContainer>
        <StateButton>To Do</StateButton>
        <StateButton>Done</StateButton>
        <StateButton>Doing</StateButton>
      </ButtonContainer>
    </ToDosContainer>
  );
}

export default ToDo;
