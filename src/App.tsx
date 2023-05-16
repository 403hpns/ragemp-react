import { useEffect, useState } from "react";

function App() {
  const [valueFromClient, setValueFromClient] = useState<string>("_");

  useEffect(() => {
    window.EventManager.addHandler("cef.index", (text: string) =>
      setValueFromClient(text)
    );
  }, []);

  return (
    <div className="p-4 flex flex-col justify-center rounded-sm border-b-4 border-orange-500 text-gray-100 bg-black/60">
      <h1 className="font-semibold text-orange-500">
        Hello {valueFromClient}, RAGE:MP!
      </h1>
      <p>
        This is an example of how you can create your own project with the React
        library.
      </p>
    </div>
  );
}

export default App;
