import { useState } from "react";
import supabase from "../../supabaseClient";

const CreateDishForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [newDish, setNewDish] = useState({
    name_ita: "",
    name_eng: "",
    description_ita: "",
    description_eng: "",
    price: "",
    category: "antipasti", // Default
    visible: true,
  });
  const createDish = async () => {
    const { error } = await supabase.from("Menu").insert([newDish]);

    if (error) {
      console.error("Errore nella creazione del piatto:", error.message);
    } else {
      setData((prevData) => [...prevData, newDish]);
      setNewDish({
        name_ita: "",
        name_eng: "",
        description_ita: "",
        description_eng: "",
        price: "",
        category: "antipasti",
        visible: true,
      });
    }
  };
  return (
    <div className="create-dish-form my-4 d-flex flex-column align-items-center justify-content-around">
      <input
        type="text"
        placeholder="Nome (ITA)"
        value={newDish.name_ita}
        onChange={(e) => setNewDish({ ...newDish, name_ita: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nome (ENG)"
        value={newDish.name_eng}
        onChange={(e) => setNewDish({ ...newDish, name_eng: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descrizione (ITA)"
        value={newDish.description_ita}
        onChange={(e) =>
          setNewDish({ ...newDish, description_ita: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Descrizione (ENG)"
        value={newDish.description_eng}
        onChange={(e) =>
          setNewDish({ ...newDish, description_eng: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Prezzo"
        value={newDish.price}
        onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
      />
      <select
        value={newDish.category}
        onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
      >
        <option value="antipasti">Antipasti</option>
        <option value="primi">Primi</option>
        <option value="secondi">Secondi</option>
        <option value="contorni">Contorni</option>
        <option value="dolci">Dolci</option>
        <option value="bevande">Bevande</option>
        <option value="vini">Vini</option>
      </select>
      <div onClick={createDish} className="border border-black px-2 py-1">
        Aggiungi Prodotto
      </div>
    </div>
  );
};
export default CreateDishForm;
