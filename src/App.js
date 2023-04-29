// import Header from "./Pages/Components/Header";

// function App() {
// 	// useEffect(() => {
// 	// 	console.log(ctx.mode);
// 	// }, [ctx.mode]);

// 	return <Header />;
// }

// export default App;

import Header from "./Pages/Components/Header";
import Landingpage from "./components/landingpage";

function App() {
  return (
    <div className="App">
      <Landingpage />
	    <Header />
    </div>
  );
}

export default App;

// function App() {


// 	return <>
//   <Header />
//   </>;
// }

// export default App;
