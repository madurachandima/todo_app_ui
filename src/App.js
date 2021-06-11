import { Heading, HStack } from "@chakra-ui/react";
import { VStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "./auth-context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes";

function App() {
  const { loggedIn, setLoggedIn } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const logOut = () => {
    localStorage.removeItem("Token");
    setLoggedIn(false);
  };

  return (
    <VStack p={4}>
      <HStack width="100%" justifyContent="space-between" position="relative">
        {loggedIn && (
          <IconButton
            icon={<FaSignOutAlt />}
            isRound="true"
            size="lg"
            onClick={logOut}
          />
        )}

        <IconButton
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
          isRound="true"
          size="lg"
          onClick={toggleColorMode}
        />
      </HStack>

      <Heading
        mb="8"
        fontWeight="extrabold"
        size="2xl"
        bgGradient="linear(to-r,pink.500,pink.300,blue.500)"
        bgClip="text"
        fontFamily="mono"
      >
        ToDo Task List
      </Heading>
      {loggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </VStack>
  );
}

export default App;
