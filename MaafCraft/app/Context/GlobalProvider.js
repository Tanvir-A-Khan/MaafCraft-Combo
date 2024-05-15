import { StateProvider } from "./AppContext";
import { CartProvider } from "./CartContext";

export function GlobalProvider({ children }) {
    return (
        <StateProvider>
            <CartProvider>{children}</CartProvider>
        </StateProvider>
    );
}
