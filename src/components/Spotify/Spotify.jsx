import styled from 'styled-components';
import { SideBar, NavBar, Body, Footer } from '@components';
import { useStateProvider } from '@utils';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { reducerCases } from '../../utils/Constants';

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const userInfo = {
        userId: response.data.id,
        userName: response.data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, user: userInfo });
    };
    getUserInfo();
  }, [token, dispatch]);

  return (
    <Container>
      <div className="spotify__body">
        <SideBar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <NavBar navBackground={navBackground}  />
          <div className="body__contents">
            <Body />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  ,ax-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
`;
