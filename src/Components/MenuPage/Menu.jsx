import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import SingleDish from "./SingleDish";

const Menu = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const url = `${supabase.supabaseUrl}/rest/v1/Menu`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: supabase.supabaseKey,
          Authorization: `Bearer ${supabase.supabaseKey}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Errore nella richiesta: ${response.status}`);
          }
          return response.json();
        })
        .then((items) => {
          setData(items);
        })
        .catch((error) => {
          console.error("Errore nel recupero dei dati:", error.message);
        });
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Data from Supabase</h1>
      {data.map((item, index) => {
        return <SingleDish key={index} item={item} />;
      })}
    </div>
  );
};
export default Menu;
