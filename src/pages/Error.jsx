import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <>
      <h2>Error: please check your internet connection and try again.</h2>
      <pre>
        {error?.status} {error?.statusText}
      </pre>
    </>
  );
}

export default Error;
