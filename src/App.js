/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useRef, createRef } from "react";
import data from "./data";

function App() {
  const [active, setActive] = useState();
  const dropdownRefs = useRef([]);
  dropdownRefs.current = data.map(
    (_, i) => dropdownRefs.current[i] ?? createRef()
  );

  useEffect(() => {
    function closeOnBody(event) {
      let dropdown = "";

      for (let i = 0; i < dropdownRefs.current.length; i++) {
        if (dropdownRefs.current[i].current.contains(event.target)) {
          dropdown = i;
        }
      }

      setActive(dropdown);
    }

    document.addEventListener("click", closeOnBody);

    return () => {
      document.removeEventListener("click", closeOnBody);
    };
  }, [dropdownRefs, active]);

  return (
    <div className="p-12">
      <h1 className="font-mono text-3xl p">React Dropdowns</h1>
      <p className="font-mono text-base mb-4">
        This is an example of multiple dropdowns on a page handling close/open
        on page click.
      </p>
      {data.map((item, index) => (
        <div
          className="relative inline-block text-left pr-4"
          key={index}
          ref={dropdownRefs.current[index]}
        >
          <div>
            <button
              onClick={() => setActive(index)}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {item.name}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {active === index && (
            <div
              className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              {item.links.map((link, i) => (
                <div className="py-1" role="none" key={i}>
                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm">
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
