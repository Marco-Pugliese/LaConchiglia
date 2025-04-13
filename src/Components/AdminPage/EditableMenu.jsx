// import { useEffect, useState } from "react";
// import supabase from "../../supabaseClient";
// import EditableSingleDish from "./EditableSingleDish";
// import { Button, Modal } from "react-bootstrap";
// import CreateDishForm from "./CreateDishForm";

// const MenuEditable = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {}, []);
//   // Funzione per caricare i piatti dal DB
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase.from("Menu").select("*");

//       if (error) {
//         console.error("Errore nel caricamento del menu:", error.message);
//       } else {
//         setData(data);
//       }
//     };

//     fetchData();
//   }, [data]);

//   const toggleVisibility = async (id, currentVisibility) => {
//     const { error } = await supabase
//       .from("Menu")
//       .update({ visible: !currentVisibility })
//       .eq("id", id);

//     if (error) {
//       console.error(
//         "Errore nell'aggiornamento della visibilità:",
//         error.message
//       );
//     } else {
//       setData((prevData) =>
//         prevData.map((item) =>
//           item.id === id ? { ...item, visible: !currentVisibility } : item
//         )
//       );
//     }
//   };

//   // Funzione per eliminare un piatto
//   const deleteDish = async (id) => {
//     const { error } = await supabase.from("Menu").delete().eq("id", id);

//     if (error) {
//       console.error("Errore nell'eliminazione del piatto:", error.message);
//     } else {
//       setData((prevData) => prevData.filter((item) => item.id !== id));
//     }
//   };

//   // Funzione per creare un nuovo piatto
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <div>
//       <h1 className="text-center">Menu</h1>
//       <>
//         <div className="text-end my-4">
//           <Button variant="success" onClick={handleShow}>
//             Crea nuovo elemento
//           </Button>

//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Crea nuovo elemento</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <CreateDishForm />
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleClose}>Close</Button>
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </>

//       <div>
//         {data
//           .sort((a, b) => {
//             const categoriesOrder = [
//               "antipasti",
//               "primi",
//               "secondi",
//               "contorni",
//               "bevande",
//               "dolci",
//               "post",
//               "vini",
//             ];

//             return (
//               categoriesOrder.indexOf(a.category) -
//               categoriesOrder.indexOf(b.category)
//             );
//           })
//           .map((item) => (
//             <EditableSingleDish
//               key={item.id}
//               item={item}
//               toggleVisibility={toggleVisibility}
//               deleteDish={deleteDish}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default MenuEditable;

import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import EditableSingleDish from "./EditableSingleDish";
import { Button, Modal } from "react-bootstrap";
import CreateDishForm from "./CreateDishForm";
import CreateNewElement from "./CreateNewElement";

const MenuEditable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Menu").select("*");

      if (error) {
        console.error("Errore nel caricamento del menu:", error.message);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, [data]);

  // Toggle visibilità
  const toggleVisibility = async (id, currentVisibility) => {
    const { error } = await supabase
      .from("Menu")
      .update({ visible: !currentVisibility })
      .eq("id", id);

    if (error) {
      console.error(
        "Errore nell'aggiornamento della visibilità:",
        error.message
      );
    } else {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, visible: !currentVisibility } : item
        )
      );
    }
  };

  // Eliminazione piatto
  const deleteDish = async (id) => {
    const { error } = await supabase.from("Menu").delete().eq("id", id);

    if (error) {
      console.error("Errore nell'eliminazione del piatto:", error.message);
    } else {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  // Funzione per ordinare i piatti
  const sortedData = data.sort((a, b) => {
    const categoriesOrder = [
      "antipasti",
      "primi",
      "secondi",
      "contorni",
      "bevande",
      "dolci",
      "post",
      "vini",
    ];

    return (
      categoriesOrder.indexOf(a.category) - categoriesOrder.indexOf(b.category)
    );
  });

  return (
    <div>
      <h1 className="text-center">Menu</h1>
      <>
        <div className="text-end my-4">
          <CreateNewElement />
        </div>
      </>

      <div>
        {sortedData.map((item) => (
          <EditableSingleDish
            key={item.id}
            item={item}
            toggleVisibility={toggleVisibility}
            deleteDish={deleteDish}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuEditable;
