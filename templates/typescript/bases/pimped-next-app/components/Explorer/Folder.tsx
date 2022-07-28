const Dot = () => (
  <div
    style={{
      zIndex: 999,
      background: "white",
      width: "1rem",
      height: "1rem",
      borderRadius: "50%",
    }}
  />
);

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  HStack,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines } from "@fortawesome/pro-regular-svg-icons";

import type { ItemType } from "../../types";

function getContent(item: ItemType, items: { [key: number]: ItemType }) {
  if (item.type === "folder") {
    return (
      <Accordion allowToggle>
        {item.children.map((i) => (
          <Folder item={items[i]} items={items} />
        ))}
      </Accordion>
    );
  }
  if (item.type === "trip") {
    return (
      <Accordion allowToggle>
        {item.children.map((i) => (
          <Folder item={items[i]} items={items} />
        ))}
      </Accordion>
    );
  }
  if (item.type === "stop") {
    const timeStr =
      item.eta === item.etd ? item.eta : item.eta + "\n" + item.etd;

    return timeStr;
  }
  if (item.type === "connection") {
    return "moin";
  }
}

interface FolderProps {
  item: ItemType;
  items: { [key: number]: ItemType };
}
function Folder({ item, items }: FolderProps) {
  const { id, parent, type, name } = item;

  return (
    <AccordionItem>
      <HStack height="3rem" spacing="0">
        <AccordionButton height="3rem">
          <HStack spacing="24px">
            {type === "stop" && <Dot />}
            {type === "connection" && (
              <div
                style={{
                  position: "absolute",
                  background: "var(--chakra-colors-vue-300)",
                  width: "1rem",
                  height: "5rem",
                }}
              />
            )}

            <Box flex="1" textAlign="left">
              {name}
            </Box>
          </HStack>
          <AccordionIcon />
        </AccordionButton>
        <Center width="3rem" height="3rem">
          <FontAwesomeIcon
            icon={faGripLines}
            color="var(--chakra-colors-gray-400)"
          />
        </Center>
      </HStack>
      <AccordionPanel p={0} pl={4}>
        {getContent(item, items)}
      </AccordionPanel>
    </AccordionItem>
  );
}
export default Folder;
