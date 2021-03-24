import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function CreateSoap() {
  const history = useHistory();

  const handleCreateSOAP = async () => {
    const res = await fetch(`http://localhost:5000/soap/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    history.push(`/soap/${data.soap._id}`);
  };

  return (
    <Box bg="gray.100" minH="100vh">
      <Button onClick={handleCreateSOAP}>Create SOAP</Button>
    </Box>
  );
}

export default CreateSoap;
