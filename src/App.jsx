import React from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Input, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const toast = useToast();

  const handleCheck = async () => {
    if (!address) {
      toast({
        title: 'Error',
        description: 'Please enter an Ethereum address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulated fraud detection result
    const fraudScore = Math.random();
    const isFraudulent = fraudScore > 0.5;

    setResult({
      address,
      isFraudulent,
      score: (fraudScore * 100).toFixed(2),
    });
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50" py={10}>
        <VStack spacing={8} maxW="container.md" mx="auto" px={4}>
          <Heading>Crypto Fraud Detection</Heading>
          <Text textAlign="center">
            Enter an Ethereum address to check for potential fraudulent activity
          </Text>
          
          <Box w="100%" bg="white" p={6} borderRadius="lg" boxShadow="md">
            <VStack spacing={4}>
              <Input
                placeholder="Enter Ethereum address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button colorScheme="blue" onClick={handleCheck} w="100%">
                Check Address
              </Button>
            </VStack>
          </Box>

          {result && (
            <Box w="100%" bg="white" p={6} borderRadius="lg" boxShadow="md">
              <VStack spacing={3} align="start">
                <Text fontWeight="bold">Results for: {result.address}</Text>
                <Text>
                  Risk Score: {result.score}%
                </Text>
                <Text color={result.isFraudulent ? 'red.500' : 'green.500'} fontWeight="bold">
                  Status: {result.isFraudulent ? 'High Risk' : 'Low Risk'}
                </Text>
              </VStack>
            </Box>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;