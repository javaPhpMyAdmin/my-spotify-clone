import styled from 'styled-components';
import CurrentTrack from '../CurrentTrack/CurrentTrack'
import PlayerControls from '../PlayerControls/PlayerControls'

export default function Footer() {
  return <Container>
    <CurrentTrack />
    <PlayerControls />
    </Container>;
}

const Container = styled.div`
  background-color: #181818;
  height: 100%;
  display: flex;
  gap:30rem
`;
