import { createGlobalStyle } from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import { useRecoilState } from "recoil";
import Board from "./components/Board";
import TrashBin from "./components/TrashBin";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const Garbage = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
  width: 150px;
  height: 150px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) return;
    setToDos((allBoards) => {
      const copyToDos: IToDoState = {};
      const taskObj = allBoards[source.droppableId][source.index];
      // console.log(taskObj);
      Object.keys(allBoards).forEach((toDosKey) => {
        copyToDos[toDosKey] = [...allBoards[toDosKey]];
      });
      if (destination.droppableId === "trashBin") {
        copyToDos[source.droppableId].splice(source.index, 1);
      } else {
        copyToDos[source.droppableId].splice(source.index, 1);
        copyToDos[destination.droppableId].splice(
          destination?.index,
          0,
          taskObj
        );
      }

      return copyToDos;
    });
  };
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
        <Garbage>
          <TrashBin />
        </Garbage>
      </DragDropContext>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans 3', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color:black;
}
a {
  text-decoration: none;
  color: inherit;
}
`;

export default App;
