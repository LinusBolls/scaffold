import { createContext } from "react";
import type { FunctionComponent } from "react";

import useItems from "./useItems.hook";
import type { UseItemsValue } from "./useItems.hook";

const ItemsContext = createContext<UseItemsValue>({} as any);
const ItemsProvider = ItemsContext.Provider;

function withItemsContext(Component: FunctionComponent) {
  const useItemsValue = useItems();

  return (
    <ItemsProvider value={useItemsValue}>
      <Component />
    </ItemsProvider>
  );
}
export default ItemsContext;
export { withItemsContext, ItemsProvider };
