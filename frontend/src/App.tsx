import "./App.css";
import ReadFileComponent from "./components/readFile";
import ReadPathComponent from "./components/readPath";

function App() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-4">
        <ReadFileComponent />

        <div className="col justify-center col-flex flex">
          <h2>Oppure</h2>
        </div>

        <ReadPathComponent />
      </div>
    </>
  );
}

export default App;
