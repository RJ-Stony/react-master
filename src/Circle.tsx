import styled from 'styled-components';

const Container = styled.div``;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container />;
}

export default Circle;
