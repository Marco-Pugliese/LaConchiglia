import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import SingleDish from "./SingleDish";

const Menu = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("Menu")
        .select("*")
        .eq("visible", true);

      if (error) {
        console.error("Errore nel caricamento del menu:", error.message);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center">
      <h1 className="mb-4 py-5">Menu</h1>
      {data.map((item, index) => {
        return <SingleDish key={index} item={item} />;
      })}
    </div>
  );
};
export default Menu;
