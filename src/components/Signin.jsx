import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './config';
import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import Home from './Home';

const Signin = () => {
  const [value, setValue] = useState('');

  const handleClick = () => {
    signInWithPopup(auth, provider).then(data => {
      setValue(data.user.email);
      localStorage.setItem('email', data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem('email'));
  });

  return (
    <>
      {value ? (
        <Home/>
      ) : (
        <>
          
          <VStack marginTop={'10'}>
            <Heading m={'10'}>Pomodoro</Heading>
            <Text fontSize={['md','4xl']}>Hey there please Sign in...</Text>
          </VStack>
          <VStack h={'30vh'} justifyContent={'center'}>
            <Button onClick={handleClick} colorScheme={'orange'} bg={'orange'} shadow={'xl'}>
              Sign in with Google
            </Button>
          </VStack>
        </>
      )}
    </>
  );
};

export default Signin;
