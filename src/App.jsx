// import React from "react";
// import { Cards, CountryPicker, Header, Skeleton } from "./components";
// import { fetchData } from "./api";

// class App extends React.Component {
//   state = {
//     data: [],
//     loading: true,
//   };

//   async componentDidMount() {
//     this.setState({ loading: true });

//     setTimeout(async () => {
//       const fetchedData = await fetchData();
//       this.setState({ data: fetchedData, loading: false });

//       this.setState({ loading: false });
//     }, 1000);
//   }

//   render() {
//     const { data, loading } = this.state;
//     return (
//       <>
//         <div className="dark:bg-[#1a2c3a] bg-[#fafafa] text-[#111517] dark:text-white">
//           <Header />
//         </div>

//         <div className="h-[100&] lg:px-20 sm:py-10 sm:px-4 dark:bg-[#1a2c3a] bg-[#fafafa] text-[#111517] dark:text-white">
//           {/* <CountryPicker /> */}

//           {loading ? (
//             <div className="grid lg:grid-cols-4 gap-20">
//               <Skeleton cards={8} />
//             </div>
//           ) : (
//             <Cards data={data} />
//           )}
//         </div>
//       </>
//     );
//   }
// }

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import Cards from "./components/Cards/Cards";
import { CountryPicker } from "./components";
import NotFound from "./components/NotFound/NotFound";
import AppLayout from "./components/AppLayout/AppLayout";

function App() {
  return (
    <>
      <div className="dark:bg-[#1a2c3a] bg-[#fafafa] text-[#111517] dark:text-white">
        <Header />
      </div>

      <div className="h-[100&] lg:px-20 sm:py-10 sm:px-4 flex flex-col space-y-14 dark:bg-[#1a2c3a] bg-[#fafafa] text-[#111517] dark:text-white">
        <CountryPicker />

        <Router>
          <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/country/:name" element={<Details />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
