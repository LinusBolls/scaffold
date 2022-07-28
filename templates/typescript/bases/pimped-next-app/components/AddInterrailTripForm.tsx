import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

function AddInterrailTripForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addItems } = useContext(ItemsContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [fetchState, setFetchState] = useState<"idle" | "fetching" | "done">(
    "idle"
  );
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const tripParams: TripParams = parse(data.interrailLink);

      setFetchState("fetching");

      const trips = await fetchTrips(tripParams);

      const legs = trips[data.tripNr].legs;

      const trip = toItemTrip(legs);

      addItems(null, trip);

      toast({
        title: "Trip Imported",
        description: `Successfully Imported Trip from ${trip[0].from.name} to ${
          trip[trip.length - 1].to.name
        }`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      const message =
        (err as any).message ?? (err as any).msg ?? "Unknown Error";

      toast({
        title: "Failed to Import Trip",
        description: `An Error Occurred: ${message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setFetchState("done");

    onClose();
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <>
      <Button onClick={onOpen}>
        <img
          src="https://www.interrail.eu/etc/designs/eurail/favicon/Eurail_Favicon_180px.png"
          style={{ width: "1rem", marginRight: "0.5rem" }}
        />
        Import Interrail Trip
      </Button>
      <Button>Import Google Maps Trip</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="2px">
          <ModalHeader>Import Interrail Trip</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Box>
                  <FormLabel htmlFor="interrailLink">Interrail Link</FormLabel>
                  <Input
                    isInvalid={!!errors.interrailLink}
                    id="interrailLink"
                    type="url"
                    placeholder="https://www.interrail.eu/en/plan-your-trip/interrail-timetable?ol=COMPIEGNE+%28FRANCE%29&ov=008727669&dl=HAMBURG+%28GERMANY%29&dv=008002710&vl=&vv=&t=1656004374828&ar=false&rt=noReservation%2C&tt=&mc=&mct=0"
                    {...register("interrailLink", { required: true })}
                  />
                  {errors.interrailLink && (
                    <Text color="red.300">This field is required</Text>
                  )}
                </Box>

                <Box>
                  <FormLabel htmlFor="tripNr">Trip Nr</FormLabel>
                  <Input
                    isInvalid={!!errors.tripNr}
                    id="tripNr"
                    placeholder="2"
                    {...register("tripNr", { required: true })}
                  />
                  {errors.tripNr && (
                    <Text color="red.300">This field is required</Text>
                  )}
                </Box>
              </Stack>

              {/* in order for the form to be submittable via pressing enter inside a form field, we need a submit input */}
              <Button type="submit" style={{ display: "none" }}>
                Submit
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="primary"
              onClick={handleSubmit(onSubmit)}
              isLoading={fetchState === "fetching"}
            >
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AddInterrailTripForm;

import axios from "axios";

import { parse } from "querystring";
import { useContext, useState } from "react";
import ItemsContext from "../services/items/items.context";

interface StationData {
  cityName: string;
  cityId: string;

  countryName: string;
  countryId: string;

  popular: boolean;

  coordinates: { lat: number; lng: number };
}

async function getStationData(station: string) {
  const url = `https://www.interrail.eu/bin/geolocation.autosuggest.json?keyword=${station}&pagePath=%2Fcontent%2Finterrail%2Fen`;

  const res = await axios.get(url);

  return res.data[0] as StationData;
}

function getInterrailTrip() {
  // ol | ov
  // dl | dv
  // t
  // rt

  // nth trip

  `https://www.interrail.eu/en/plan-your-trip/interrail-timetable?ol=COMPIEGNE+%28FRANCE%29&ov=008727669&dl=HAMBURG+%28GERMANY%29&dv=008002710&vl=&vv=&t=1656004374828&ar=false&rt=noReservation%2C&tt=&mc=&mct=0`;
}

/* <slot:3rd-class-imports/> */

/* <slot:2nd-class-imports/> */

/* <slot:1st-class-imports/> */

/* <slot:util/> */

interface TripParams {
  ol: string; // name of city
  ov: string; // id of city
  dl: string; // name of city
  dv: string; // id of city
  t: string; // timestamp
  rt: string; // "noReservation"
}

async function fetchTrips({ ol, ov, dl, dv, t, rt }: TripParams) {
  // const iso = new Date(t / 1000).toISOString();
  // actual: 1970-01-20T04:00:04.374Z
  // expected: 2022-06-23T19:12:54.828Z

  const iso = new Date().toISOString();

  const url = `https://api.timetable.eurail.com/v2/timetable?origin=${ov}&destination=${dv}&via=&timestamp=${iso}&tripsNumber=5&arrival=false&currency=EUR&reservationType=${rt}`;

  const res = await axios.get(url);

  return res.data;
}

const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

function toItemConnectionStop(ding: any) {
  const { country, station, dateTimeInISO, id } = ding;

  const name = toTitleCase(station);
  const time = new Date(dateTimeInISO).getTime();

  return {
    country,
    name,
    time,
    interrailId: id,
    address: station,
  };
}

function toItemTrip(interrailTrip: any[]) {
  return interrailTrip.map((i) => ({
    from: toItemConnectionStop(i.start),
    to: toItemConnectionStop(i.end),
    type: "connection",
    name: "step",
  }));
}
