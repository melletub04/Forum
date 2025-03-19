// views/AddThreadView.js
import { useNavigate } from "react-router-dom";
import ThreadForm from "../Components/ThreadForm";

const AddThreadView = () => {
  const navigate = useNavigate();



  return (
    <div className="add-thread-container">
      <ThreadForm 
        onCancel={() => navigate("/")}
      />
    </div>
  );
};

export default AddThreadView;
