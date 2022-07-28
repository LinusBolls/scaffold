import { Accordion, Button, HStack } from "@chakra-ui/react";
import { useContext } from "react";
import ItemsContext from "../../services/items/items.context";
import Folder from "./Folder";

interface ExplorerProps {
  container: number | null;
}

function Explorer({ container }: ExplorerProps) {
  const { items } = useContext(ItemsContext);

  return (
    <Accordion
      allowToggle
      width="20rem"
      borderRight="1px solid var(--chakra-colors-gray-700)"
    >
      <HStack p="10px" textAlign="left">
        <Button colorScheme="primary" borderRadius="2">
          Button
        </Button>
      </HStack>

      {Object.values(items)
        .filter((i) => i.parent === container)
        .map((i) => (
          <Folder item={i} items={items} />
        ))}
    </Accordion>
  );
}
export default Explorer;
export type { ExplorerProps };
