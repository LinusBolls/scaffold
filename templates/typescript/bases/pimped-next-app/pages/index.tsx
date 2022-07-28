import {
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
} from "react";

import axios from "axios";

import type { FC, ReactNode, EffectCallback } from "react";

import type { ItemType } from "../types";

import { List, arrayMove } from "react-movable";

import AddInterrailTripForm from "../components/AddInterrailTripForm";

import {
  Box,
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import Explorer from "../components/Explorer";
import Polygon, { toMapCoords } from "../components/Map/Polygon";

import styles from "../components/Map/styles";
import MapContext from "../components/Map/map.context";
import { faLocationArrow } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function getCountryPolygons() {
  const url = "/countries.geojson";

  const res = await axios.get(url);

  return res.data.features.map((i) => toMapCoords(i.geometry.coordinates));
}

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const apiKey = "AIzaSyD6X5gL6KWLsCuQzLPp8RX-qB0vsIekhOc";

const items: { [key: number]: ItemType } = {
  0: {
    id: 0,
    parent: null,
    children: [3, 4],
    type: "folder",
    name: "In der Sache Workation",
  },
  1: {
    id: 1,
    parent: null,
    children: [],
    type: "folder",
    name: "Portooo",
  },
  2: {
    id: 2,
    parent: null,
    children: [],
    type: "folder",
    name: "Berkand Besuch",
  },
  3: {
    id: 3,
    parent: 0,
    children: [],
    type: "folder",
    name: "Hinfahrt",
  },
  4: {
    id: 4,
    parent: 0,
    children: [5, 6, 7],
    type: "trip",
    name: "Rückfahrt",
  },
  5: {
    id: 5,
    parent: 4,
    type: "stop",
    name: "Bellac",
    eta: new Date(),
    etd: new Date(),
  },
  6: {
    id: 6,
    parent: 4,
    type: "connection",
    name: "Walk",
  },
  7: {
    id: 7,
    parent: 4,
    type: "stop",
    name: "Poitiers",
    eta: new Date(),
    etd: new Date(),
  },
};

// https://goo.gl/maps/hGnsjUbbxmkNQLPg8

// https://www.google.com/maps/dir/53.5642906,9.8761708/Paris,+France/@51.0362936,3.9458648,7z/am=t/data=!4m10!4m9!1m1!4e1!1m5!1m1!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!2m2!1d2.3522219!2d48.856614!3e3

// https://www.google.com/maps/dir/53.5642906,9.8761708/Paris,+France/@51.0362936,3.9458648,7z/data=!4m11!4m10!1m1!4e1!1m5!1m1!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!2m2!1d2.3522219!2d48.856614!3e3!5i1

// https://www.google.com/maps/dir/53.5642906,9.8761708/Paris,+France/@51.0362936,3.9458648,7z/data=!4m11!4m10!1m1!4e1!1m5!1m1!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!2m2!1d2.3522219!2d48.856614!3e3!5i2

// https://www.google.com/maps/dir/53.5642906,9.8761708/Paris,+France/@51.0362936,3.9458648,7z/am=t/data=!4m11!4m10!1m1!4e1!1m5!1m1!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!2m2!1d2.3522219!2d48.856614!3e3!5i1

// https://maps.googleapis.com/maps/api/directions/json
//   ?destination=place_id%3AChIJA01I-8YVhkgRGJb0fW4UX7Y
//   &origin=place_id%3AChIJ685WIFYViEgRHlHvBbiD5nE
//   &key=YOUR_API_KEY

//   https://maps.googleapis.com/maps/api/directions/json?destination=place_id%3AChIJA01I-8YVhkgRGJb0fW4UX7Y&origin=place_id%3AChIJ685WIFYViEgRHlHvBbiD5nE&key=AIzaSyD6X5gL6KWLsCuQzLPp8RX-qB0vsIekhOc

const initialCenter = {
  lat: 0,
  lng: 0,
};
const initialZoom = 3;

function Page() {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(initialCenter);

  const [polygons, setPolygons] = useState<any[]>([]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  useEffect(() => {
    getCountryPolygons().then((i) => setPolygons(i));
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SuperSimple />
      <Explorer container={null} />
      <Wrapper apiKey={apiKey} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {polygons.map((i) => {
            return <Polygon paths={i} />;
          })}
        </Map>
      </Wrapper>

      <Box
        w="20rem"
        h="100%"
        borderLeft="1px solid var(--chakra-colors-gray-700)"
      >
        <HStack p="10px" textAlign="left">
          <Button colorScheme="primary" borderRadius="2">
            Button
          </Button>

          <InputGroup>
            <InputLeftAddon
              children={<FontAwesomeIcon icon={faLocationArrow} />}
              borderRadius="2px"
            />
            <Input
              variant="filled"
              borderRadius="2px"
              value={center.lat.toFixed(3) + ", " + center.lng.toFixed(3)}
              onChange={(e: any) => {
                const [lat, lng] = e.target.value.split(", ").map(parseFloat);

                setCenter({ lat, lng });
              }}
            />
          </InputGroup>
        </HStack>

        <Box pl="10px" color="white"></Box>
        <AddInterrailTripForm />
      </Box>
    </div>
  );
}
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactNode;
}

const Map: FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  map?.setOptions({ styles });

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <MapContext.Provider value={map}>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </MapContext.Provider>
  );
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: EffectCallback,
  dependencies: any[]
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default Page;

function SuperSimple() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  return (
    <List
      lockVertically={true}
      values={items}
      onChange={({ oldIndex, newIndex }) =>
        setItems(arrayMove(items, oldIndex, newIndex))
      }
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props }) => <li {...props}>{value}</li>}
    />
  );
}
