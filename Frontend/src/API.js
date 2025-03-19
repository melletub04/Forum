const API_URL = "http://localhost:3000"; // Bas-URL för API:et

// Skapa en ny tråd
export const addThread = async (newThread) => {
  try {
    console.log("Sending thread data:", newThread);
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newThread),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.error || `HTTP error! status: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    console.error("Error in addThread:", error);
    throw error;
  }
};

// Hämtar alla trådar
export const getAllThreads = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching threads:", error);
    return [];
  }
};

// Hämta en enskild tråd via ID
export const getThreadById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch thread with id: ${id}, Status: ${response.status}`
    ); // Felhantering om tråden inte kan hämtas
  }

  return response.json();
};

// Uppdatera en tråd
export const updateThread = async (id, updatedThread) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedThread),
  });

  if (!response.ok) {
    throw new Error("Failed to update thread");
  }

  return response.json(); // Returnerar den uppdaterade tråden
};

// Kommentarer
// Hämtar alla kommentarer för en tråd
export const getComments = async (threadId) => {
  const response = await fetch(`${API_URL}/${threadId}/comments`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};

// Skapar en ny kommentar
export const addComment = async (threadId, comment) => {
  const response = await fetch(`${API_URL}/${threadId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (!response.ok) throw new Error("Failed to add comment");
  return response.json(response.lastInsertRowId);
};

// Uppdatera en kommentar
export const updateComment = async (threadId, commentId, updatedComment) => {
  const response = await fetch(`${API_URL}/${threadId}/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedComment),
  });
  if (!response.ok) throw new Error("Failed to update comment");
  return response.json();
};

// Ta bort en kommentar
export const deleteComment = async (threadId, commentId) => {
  const response = await fetch(`${API_URL}/${threadId}/comments/${commentId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to delete comment");
  return response.json();
};
