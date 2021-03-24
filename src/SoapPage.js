import { useEffect, useState } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import isEqual from "lodash.isequal";

function SoapPage() {
  const params = useParams();
  const [savedValue, setSavedValue] = useState({});
  const { handleSubmit, register, getValues, reset } = useForm({
    defaultValues: savedValue,
  });

  const onSubmit = async (value) => {
    // console.log({ value });
    const res = await fetch(`http://localhost:5000/soap/${savedValue._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/soap/${params.id}`);
      const data = await res.json();
      setSavedValue(data.soap);
      reset(data.soap);
    };
    fetchData();
  }, [params.id, reset]);

  useEffect(() => {
    const interval = setInterval(async () => {
      let values = getValues();

      if (savedValue._id) {
        values = { ...values, _id: savedValue._id };
      }

      const changed = !isEqual(values, savedValue);

      if (savedValue._id && changed) {
        const res = await fetch(
          `http://localhost:5000/soap/${savedValue._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();
        console.log(data);
        setSavedValue(data.soap);
      }
      // else if (!savedValue._id) {
      //   const res = await fetch(`http://localhost:5000/soap/`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values),
      //   });
      //   const data = await res.json();
      //   console.log(data);
      //   setSavedValue(data.soap);
      // }
    }, 5000);
    return () => clearInterval(interval);
  }, [getValues, savedValue]);

  return (
    <Box bg="gray.100" minH="100vh">
      <Heading textAlign="center" mb="10">
        Form
      </Heading>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        as="form"
        bg="white"
        maxW="md"
        boxShadow="md"
        mx="auto"
        py="4"
        px="8"
      >
        <VStack spacing="4" align="start">
          <FormControl id="subjective">
            <FormLabel>Subjective</FormLabel>
            <Input type="text" name="subjective" ref={register} />
          </FormControl>
          <FormControl id="objective">
            <FormLabel>Objective</FormLabel>
            <Input type="text" name="objective" ref={register} />
          </FormControl>
          <FormControl id="assesment">
            <FormLabel>Assesment</FormLabel>
            <Input type="text" name="assesment" ref={register} />
          </FormControl>
          <FormControl id="plan">
            <FormLabel>Plan</FormLabel>
            <Input type="text" name="plan" ref={register} />
          </FormControl>
        </VStack>
        <Box textAlign="right" mt="8">
          <Button type="submit">Submit</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SoapPage;
