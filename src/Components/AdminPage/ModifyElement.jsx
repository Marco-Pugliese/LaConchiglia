import { useState } from "react";
import supabase from "../../supabaseClient";

const ModifyElement = ({ item }) => {
  const [updatedDish, setUpdatedDish] = useState({
    name_ita: item.name_ita,
    name_eng: item.name_eng,
    description_ita: item.description_ita || "",
    description_eng: item.description_eng || "",
    price: item.price,
    category: item.category || "antipasti",
    visible: item.visible,
  });

  const [updateError, setUpdateError] = useState(null);

  const handleUpdate = async () => {
    if (
      updatedDish.name_ita === "" ||
      updatedDish.name_eng === "" ||
      updatedDish.price === ""
    ) {
      setUpdateError(true);
      return;
    }

    const { error } = await supabase
      .from("Menu")
      .update(updatedDish)
      .eq("id", item.id);

    if (error) {
      console.error("Errore nell'aggiornamento del piatto:", error.message);
      setUpdateError(true);
    } else {
      setUpdateError(false);
    }
  };

  return (
    <div className="modify-dish-form my-4 d-flex flex-column align-items-center justify-content-around">
      <input
        type="text"
        placeholder="Nome (ITA) (*)"
        value={updatedDish.name_ita}
        onChange={(e) =>
          setUpdatedDish({ ...updatedDish, name_ita: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Nome (ENG) (*)"
        value={updatedDish.name_eng}
        onChange={(e) =>
          setUpdatedDish({ ...updatedDish, name_eng: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Descrizione (ITA)"
        value={updatedDish.description_ita}
        onChange={(e) =>
          setUpdatedDish({ ...updatedDish, description_ita: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Descrizione (ENG)"
        value={updatedDish.description_eng}
        onChange={(e) =>
          setUpdatedDish({ ...updatedDish, description_eng: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Prezzo (*)"
        value={updatedDish.price}
        onChange={(e) =>
          setUpdatedDish({ ...updatedDish, price: e.target.value })
        }
      />
      <select
        value={updatedDish.category}
        onChange={(e) =>
          setUpdatedDish({ ...updatedDish, category: e.target.value })
        }
      >
        <option value="antipasti">Antipasti</option>
        <option value="primi">Primi</option>
        <option value="secondi">Secondi</option>
        <option value="contorni">Contorni</option>
        <option value="dolci">Dolci</option>
        <option value="bevande">Bevande</option>
        <option value="vini">Vini</option>
      </select>

      <div
        onClick={handleUpdate}
        className="modificaprodotto px-2 py-1 bg-warning text-dark mt-2"
      >
        Salva Modifiche
      </div>

      <div className="small text-danger mt-2">
        <span className="small">
          <strong className="fs-6">*</strong> Indica un campo obbligatorio
        </span>
      </div>

      {updateError && (
        <div className="bg-danger text-light rounded-4 p-4 mt-4">
          Compila tutti i campi contrassegnati dall' *
        </div>
      )}
      {updateError !== null && updateError === false ? (
        <div className="bg-success text-light rounded-4 p-4 mt-4">
          Elemento aggiornato correttamente
        </div>
      ) : null}
    </div>
  );
};

export default ModifyElement;
