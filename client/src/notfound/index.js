//component if a route has not been found

import { Text, Box } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <div id="not-found">
      <Box textAlign="center" mt={10}>
        <Text fontSize="3xl" as="u" color="blue">
          Route Not found
        </Text>
      </Box>
      <Box textAlign="center">
        <Text fontSize="3xl">the requested route has not been found.</Text>
      </Box>
    </div>
  );
}
