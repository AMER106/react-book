// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // import Navbar from "./components/Navbar";

// // import { lazy, Suspense } from "react";

// // const Home = lazy(() => import("./pages/Home"));
// // const Dashboard = lazy(
// //   () =>
// //     new Promise((resolve) => {
// //       console.log("Started downloading Dashboard...");

// //       setTimeout(() => {
// //         console.log("Dashboard downloaded!");

// //         resolve(import("./pages/Dashboard"));
// //       }, 5000);
// //     })
// // );
// // const Settings = lazy(() => import("./pages/Settings"));

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Navbar />
// // <Suspense fallback={<div>Loading...</div>}>
// //       <Routes>
// //         <Route path="/" element={<Home />} />

// //         <Route path="/dashboard" element={<Dashboard />} />

// //         <Route path="/settings" element={<Settings />} />
// //       </Routes>
// // </Suspense>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;

// import { useState,useMemo } from "react";

// function expensiveCalculation() {
//   console.log("Calculating...");

//   let total = 0;

//   for (let i = 0; i < 100000000; i++) {
//     total += i;
//   }

//   return total;
// }

// export default function App() {
//   const [count, setCount] = useState(0);

//   // const total = expensiveCalculation();
//   const total = useMemo(() => {
//   return expensiveCalculation();
// }, []);

//   return (
//     <>
//       <h1>{count}</h1>
//       <h2>{total}</h2>

//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>
//     </>
//   );
// }
// import {useState, useEffect} from "react";
//  export default function App() {
//   const [count, setCount] = useState(0);

//   console.log("Render");

//   useEffect(() => {
//     console.log("Effect");

//     return () => {
//       console.log("Cleanup");
//     };
//   }, [count]);

//   return (
//     <button onClick={() => setCount(count + 1)}>
//       {count}
//     </button>
//   );
// }

// export default function App() {
//   console.log("App Render");

//   const handleClick = () => {
//     console.log("Function Executed");
//   };

//   console.log("Function Created");

//   return (
//     <>
//       <button onClick={handleClick}>Click Me</button>
//     </>
//   );
// }

// import { useRef } from "react";

// export default function App() {
//   const inputRef = useRef(null);

//   function handleClick() {
//     inputRef.current.focus();
//   }

//   return (
//     <>
//       <input ref={inputRef} />

//       <button onClick={handleClick}>
//         Focus Input
//       </button>
//     </>
//   );
// }

import { BrowserRouter, Route ,Routes} from "react-router-dom";
import useToggle from "./useToggle";
import ProductsPage from "./pages/ProductsPage";
export default function App(){

  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={< ProductsPage/>} />
  </Routes>
  </BrowserRouter>
    </>
  );
}