import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { TbTrash, TbTrashOff } from "react-icons/tb";

const Container = styled.div`
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Content = styled.div<{
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}>`
  width: 90px;
  height: 90px;
  padding: 10px;
`;

function TrashBin() {
  return (
    <Container>
      <Droppable droppableId="trashBin">
        {(
          provided: DroppableProvided,
          {
            isDraggingOver,
            draggingOverWith,
            draggingFromThisWith,
            isUsingPlaceholder,
          }: DroppableStateSnapshot
        ) => (
          <Content
            isDraggingOver={isDraggingOver}
            draggingFromThisWith={Boolean(draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {isDraggingOver === false ? (
              <TbTrash size={80} color="#16a085" />
            ) : (
              <TbTrashOff size={80} color="#16a085" />
            )}
            {provided.placeholder}
          </Content>
        )}
      </Droppable>
    </Container>
  );
}

export default TrashBin;
