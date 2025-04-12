import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const EditableMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name_ita: "",
    price: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  const categoryOrder = [
    "antipasti",
    "primi",
    "secondi",
    "contorni",
    "dolci",
    "post", // amari e caffè
    "bevande",
    "vino",
  ];
  const toggleVisibility = (item) => {
    supabase
      .from("Menu")
      .update({ visible: !item.visible })
      .eq("id", item.id)
      .then(({ error }) => {
        if (error) console.error("Errore nel toggle:", error.message);
        else fetchMenu();
      });
  };
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    supabase
      .from("Menu")
      .select("*")
      .then(({ data, error }) => {
        if (error) console.error("Errore nel fetch:", error);
        else setMenuItems(data);
      });
  };

  const addItem = () => {
    if (!newItem.name_ita || !newItem.category) return;

    supabase
      .from("Menu")
      .insert([newItem])
      .then(({ error }) => {
        if (error) console.error("Errore inserimento:", error);
        else {
          setNewItem({ name_ita: "", price: "", category: "" });
          fetchMenu();
        }
      });
  };

  const deleteItem = (id) => {
    supabase
      .from("Menu")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Errore eliminazione:", error);
        else fetchMenu();
      });
  };

  const updateItem = (id, updatedItem) => {
    supabase
      .from("Menu")
      .update(updatedItem)
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Errore aggiornamento:", error);
        else {
          setEditingId(null);
          fetchMenu();
        }
      });
  };

  const groupedItems = categoryOrder.reduce((acc, category) => {
    acc[category] = menuItems.filter((item) => item.category === category);
    return acc;
  }, {});

  return (
    <div>
      <h2>Modifica Menu</h2>

      {/* Aggiungi nuovo piatto */}
      <div>
        <input
          type="text"
          placeholder="Nome piatto"
          value={newItem.name_ita}
          onChange={(e) => setNewItem({ ...newItem, name_ita: e.target.value })}
        />
        <input
          type="text"
          placeholder="Prezzo"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={newItem.category}
          onChange={(e) =>
            setNewItem({ ...newItem, category: e.target.value.toLowerCase() })
          }
        />
        <button onClick={addItem}>Aggiungi</button>
      </div>

      {/* Sezioni per categoria */}
      {categoryOrder.map((category) => {
        const items = groupedItems[category];
        if (!items || items.length === 0) return null;

        const titolo = category.charAt(0).toUpperCase() + category.slice(1);

        return (
          <div key={category}>
            <h3>{titolo}</h3>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {editingId === item.id ? (
                    <>
                      <input
                        type="text"
                        value={item.name_ita}
                        onChange={(e) =>
                          setMenuItems((prev) =>
                            prev.map((el) =>
                              el.id === item.id
                                ? { ...el, name_ita: e.target.value }
                                : el
                            )
                          )
                        }
                      />
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) =>
                          setMenuItems((prev) =>
                            prev.map((el) =>
                              el.id === item.id
                                ? { ...el, price: e.target.value }
                                : el
                            )
                          )
                        }
                      />
                      <button onClick={() => updateItem(item.id, item)}>
                        Salva
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={{ opacity: item.visible ? 1 : 0.5 }}>
                        {item.name_ita} - €{item.price}
                      </span>
                      <button onClick={() => setEditingId(item.id)}>
                        Modifica
                      </button>
                    </>
                  )}
                  <button onClick={() => toggleVisibility(item)}>
                    {item.visible ? false : true}
                  </button>
                  <button onClick={() => deleteItem(item.id)}>Elimina</button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default EditableMenu;
