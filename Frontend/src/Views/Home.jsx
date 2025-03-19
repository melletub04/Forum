import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllThreads } from "../API";
import ThreadCard from "../Components/ThreadCard";
import SearchField from "../Components/SearchField";
import DateFilter from "../Components/DateFilter";

const ForumHome = () => {
  const [allThreads, setAllThreads] = useState([]);
  const [displayedThreads, setDisplayedThreads] = useState([]);
  const [query, setQuery] = useState("");
  const [dateOrder, setDateOrder] = useState("newest");

  const fetchThreads = async () => {
    try {
      const data = await getAllThreads();
      console.log("Fetched threads:", data); // För att se hämtad data
      setAllThreads(data);
      setDisplayedThreads(data);
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []); // Körs när komponenten monteras

  // Uppdatera threads var 5:e sekund
  useEffect(() => {
    const interval = setInterval(() => {
      fetchThreads();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filterThreads = (searchTerm) => {
    setQuery(searchTerm);
    const filtered = allThreads.filter(thread =>
      Object.values(thread)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setDisplayedThreads(filtered);
  };

  const handleDateSort = (order) => {
    setDateOrder(order);
  };

  const sortedThreads = [...displayedThreads].sort((a, b) => {
    return dateOrder === "newest" 
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <main className="forum-container">
      <header className="forum-header">
        <h1>Golf Forum</h1>
        <p>Dela dina tankar om den senaste tävlingen, The Players Championship</p>

        <div className="forum-controls">
          <SearchField
            value={query}
            onChange={(e) => filterThreads(e.target.value)}
          />
          <DateFilter
            value={dateOrder}
            onChange={(e) => handleDateSort(e.target.value)}
          />
          <Link to="/add-thread" className="create-thread-btn">
            Skapa tråd
          </Link>
        </div>
      </header>

      <section className="threads-grid">
        {sortedThreads.length === 0 ? (
          <p className="no-results">Inga trådar hittades</p>
        ) : (
          sortedThreads.map(thread => (
            <ThreadCard key={thread.id} data={thread} />
          ))
        )}
      </section>
    </main>
  );
};

export default ForumHome;
