import React from "react";

import { useColorModeValue } from "@chakra-ui/react";

function LibraryLogo(props: any) {
  return (
    <svg
      viewBox="0 0 138 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="77.4773"
        y="1.73648"
        width="10"
        height="10"
        transform="rotate(-10 77.4773 1.73648)"
        fill={useColorModeValue("#222222", "white")}
      />
      <rect
        x="80.082"
        y="16.5086"
        width="10"
        height="46"
        transform="rotate(-10 80.082 16.5086)"
        fill={useColorModeValue("#222222", "white")}
      />
      <rect
        x="88.9381"
        y="66.7338"
        width="10"
        height="10"
        transform="rotate(-10 88.9381 66.7338)"
        fill={useColorModeValue("#222222", "white")}
      />
      <rect
        x="64"
        y="0.290939"
        width="10"
        height="10"
        fill={useColorModeValue("#222222", "white")}
      />
      <rect
        x="64"
        y="15.2909"
        width="10"
        height="46"
        fill={useColorModeValue("#222222", "white")}
      />
      <rect
        x="64"
        y="66.2909"
        width="10"
        height="10"
        fill={useColorModeValue("#222222", "white")}
      />
      <rect
        x="44"
        y="0.290939"
        width="10"
        height="10"
        fill={useColorModeValue("#222222", "white")}
      />
      <rect
        x="44"
        y="15.2909"
        width="10"
        height="46"
        fill={useColorModeValue("#222222", "white")}
      />
      <rect
        x="44"
        y="66.2909"
        width="10"
        height="10"
        fill={useColorModeValue("#222222", "white")}
      />
      <path
        d="M33.7778 21.7354L25.3333 13.2909L0 38.6243L25.3333 63.9576L33.7778 55.5132L16.8889 38.6243L33.7778 21.7354Z"
        fill={useColorModeValue("#222222", "white")}
      />
      <path
        d="M104 55.5132L112.444 63.9576L137.778 38.6243L112.444 13.2909L104 21.7354L120.889 38.6243L104 55.5132Z"
        fill={useColorModeValue("#222222", "white")}
      />
    </svg>
  );
}
export { LibraryLogo };
