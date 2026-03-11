import Navbar from "./components/Navbar";
import MainRoutes from "./routes/Mainroutes";

const App = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden">
      <div className="w-fit h-fit bg-yellow-500">
         <Navbar />
      </div>

      <div className="ml-44">
        <MainRoutes />
      </div>

    </div>
  );
};

export default App;