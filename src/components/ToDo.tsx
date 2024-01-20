import styled from "styled-components";
import { IToDo, toDoState } from "./atoms";
import { useSetRecoilState } from "recoil";

const ToDosContainer = styled.li`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.span`
  padding: 3px 15px 3px 15px;
  border: 1px solid lightcoral;
  border-radius: 5px;
  margin-right: 10px;
`;

const ButtonContainer = styled.span``;

const StateButton = styled.button`
  border-radius: 5px;
  background-color: #228be6;
  color: white;
  margin-right: 5px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
  };
  return (
    <ToDosContainer>
      <TextContainer>{text}</TextContainer>
      <ButtonContainer>
        {category !== "TO_DO" && (
          <StateButton name="TO_DO" onClick={onClick}>
            해야 할 일
          </StateButton>
        )}
        {category !== "DOING" && (
          <StateButton name="DOING" onClick={onClick}>
            하는 중...
          </StateButton>
        )}
        {category !== "DONE" && (
          <StateButton name="DONE" onClick={onClick}>
            해냈다!
          </StateButton>
        )}
      </ButtonContainer>
    </ToDosContainer>
  );
}

export default ToDo;
