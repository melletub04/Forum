import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getThreadById, updateThread } from "../API";
import ThreadForm from "../Components/ThreadEditForm";

export default function EditThreadView() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const navigate = useNavigate(); // Hook för navigering

  // Effekt körs vid laddning eller när ID ändras
  useEffect(() => {
    async function fetchThread() {
      try {
        const fetchedThread = await getThreadById(id); // hämtar tråden från API baserat på ID
        setThread(fetchedThread); // sparar hämtade tråden i state
      } catch (error) {
        console.error("Failed to fetch thread:", error);
      }
    }
    fetchThread(); // Anropar funktionen för att hämta tråden
  }, [id]); // Körs om ID ändras

  // Uppdaterar tråden
  const handleUpdate = async (updatedThread) => {
    try {
      await updateThread(id, updatedThread); // Anropar API för att uppdatera tråden
      navigate(`/`);
    } catch (error) {
      console.error("Error updating thread:", error);
    }
  };

  return (
    <div>
      {thread ? (
        <ThreadForm
          initialData={thread}
          onSubmit={handleUpdate}
          onCancel={() => navigate(`/`)}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
