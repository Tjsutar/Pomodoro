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
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';

function App() {
  const [activemode, setActivemode] = useState('Work Mode');
  const [time, setTime] = useState(1500);
  const [isActive, setisActive] = useState(false);
  const [maxprogress, setMaxprogress] = useState(1500);

  const [uname, setUname] = useState('');

  let count = 0;

  useEffect(() => {
    if (isActive && time > 0) {
      const interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (time === 0) ++count;

    if (count && time === 0) {
      setActivemode('Break-Mode');
      setTime(300);
      setMaxprogress(300);
    }

    onAuthStateChanged(auth, user => {
      if (user.email) setUsername(user.email);
    });
  }, [time, isActive]);

  function setUsername(email) {
    setUname(email.split('@')[0]);
  }

  const toggleClock = () => {
    setisActive(!isActive);
  };

  const getTime = time => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  };

  const resetTimer = () => {
    setTime(1500);
    setActivemode('Work mode');
    setMaxprogress(1500);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Container fontFamily={'sans-serif'}>
      <VStack>
        <Heading m={'5'} fontWeight={'bold'}>
          Pomodoro
        </Heading>
        <Text m={'10'} fontSize={['lg','xl']} >
          Welcome {uname}
        </Text>
        <HStack>
          <Box
            borderRadius={'full'}
            bg={'orange'}
            p={'3'}
            color={'blackAlpha.800'}
            fontWeight={'bold'}
            paddingInline={'5'}
            shadow={'xl'}
          >
            {activemode}
          </Box>
        </HStack>

        <Stack>
          <CircularProgress
            size="400px"
            thickness={'3px'}
            color="orange"
            max={maxprogress}
            value={time}
          >
            <CircularProgressLabel>
              <Text fontSize="6xl" mt={'36'}>
                {getTime(time)}
              </Text>
              <Button
                fontSize={'15'}
                borderRadius={'full'}
                onClick={toggleClock}
                colorScheme="red"
                mb={'40'}
                shadow={'xl'}
              >
                {isActive ? 'PUASE' : 'START'}
              </Button>
            </CircularProgressLabel>
          </CircularProgress>
        </Stack>

        <Button
          fontSize={'15'}
          borderRadius={'full'}
          onClick={() => resetTimer()}
          bg={'facebook.500'}
          textColor={'white'}
          shadow={'xl'}
        >
          RESET
        </Button>
      </VStack>
      <VStack mt={'30'}>
        <Button
          w={'80'}
          onClick={logout}
          colorScheme={'orange'}
          bg={'orange'}
          shadow={'xl'}
          borderRadius={'full'}
        >
          Logout
        </Button>
      </VStack>
    </Container>
  );
}

export default App;
