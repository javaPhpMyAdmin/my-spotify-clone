import styled from 'styled-components';
import {BsFillPlayCircleFill,BsFillPauseCircleFill,BsShuffle} from 'react-icons/bs'
import {CgPlayTrackNext,CgPlayTrackPrev} from 'react-icons/cg'
import {FiRepeat} from 'react-icons/fi'
import { reducerCases, useStateProvider } from '@utils';
import axios from 'axios'

export default function PlayerControls(){
  const [{ token, playerState}, dispatch] = useStateProvider();
  const changeTrack = async (type)=>{
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,{},
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          }
        },
      );
    const response = await axios.get(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if(response.data !== ''){
        const currentlyPlaying={
          id:response.data.item.id,
          name:response.data.item.name,
          artists:response.data.item.artists.map((artist)=>artist.name),
          image:response.data.item.album.images[2].url
        }
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }else{
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null});
      } 
      console.log(response)
      // dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });  
  }
  
  return(
    <Container>
      <div className='shuffle'>
        <BsShuffle />
      </div>
      <div className='previous'>
        <CgPlayTrackPrev onClick={()=>changeTrack('prev')} />
      </div>
      <div className='state'>
        { playerState ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill /> } 
      </div>
      <div className='next'>
        <CgPlayTrackNext  onClick={()=>changeTrack('next')}/>
      </div>
      <div className='repeat'>
        <FiRepeat />
      </div>
    </Container>
  )
}

const Container=styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:2rem;
  svg {
    color:#b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white
    }
  }
  .state {
    svg {
      color:white;
    } 
  }
  .previous, .next,.state {
    font-size: 2rem;
  }
`
