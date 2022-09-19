import { Suspense, lazy, createContext, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("../pages/home"));
const Invest = lazy(() => import("../pages/invest"));
const LoadingMessage = () => ("Loading...");
export const NumberContext = createContext();


const Routing = () => {
  const [cart, setCart] = useState([]);
  return (
    <NumberContext.Provider value={{ cart: cart, setCart: setCart }} >
      <Suspense fallback={<LoadingMessage />}>
        <HashRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/invest" element={<Invest />} />
          </Routes>
        </HashRouter>
      </Suspense>
    </NumberContext.Provider>
  )
}
export default Routing;