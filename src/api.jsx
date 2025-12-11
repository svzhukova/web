import { useEffect, useState } from "react";
import { getItem } from "./api";

function Abonements() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getItem(5).then(setData);
  }, []);

  return <div>{data && JSON.stringify(data)}</div>;
}
