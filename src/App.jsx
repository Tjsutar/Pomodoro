//import { Global } from '@emotion/react';
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';


function App() {
  const [activemode,setActivemode] = useState("Work Mode");
  const [time, setTime] = useState(5);
  const [isActive, setisActive] = useState(false);
  const [maxprogress,setMaxprogress] = useState(1800);
  const [prgressvalue,setProgressvalue] = useState()
  
  let count=0

  useEffect(() => {
    
    if (isActive && time > 0) {

      const interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
    
    if(time==0) ++count;

    if(count && time==0){ 
      setActivemode("Break-Mode")
      setTime(300);
    }

  }, [time,isActive]);

  const toggleClock = () => {
    setisActive(!isActive);
  };

  const getTime = time => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <Container fontFamily={'sans-serif'}>
      <VStack>
        <Heading m={'10'}>Pomodoro</Heading>

        <HStack>
          <Box borderRadius={'full'} bg={'orange'} p={'2'} color={'blackAlpha.800'} >{activemode}</Box>
        </HStack>

        <Stack>
          <CircularProgress
            size="400px"
            thickness={'4px'}
            color="orange"
            max={maxprogress}
            value={prgressvalue}
          >
            <CircularProgressLabel>
              <Text fontSize="6xl">{getTime(time)}</Text>
                <Button fontSize={'15'} borderRadius={'full'} onClick={toggleClock}>
                  {isActive ? "PUASE" : "START"}
                </Button>
            </CircularProgressLabel>
          </CircularProgress>
        </Stack>

        <Button fontSize={'15'} borderRadius={'full'} onClick={toggleClock}>
          RESET    
        </Button>
      </VStack>
    </Container>
  );
}

export default App;
