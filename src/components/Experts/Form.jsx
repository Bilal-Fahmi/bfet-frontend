import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiInstance } from "../../axiosInstance/Instance";
import { useState } from "react";
import jwtDecode from "jwt-decode";

function Form() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
    }
    if (!selectedOption) {
      toast.error("Please select an option (Fit Mind or Fit Body)");
      return;
    }
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("document", file);
      formData.append("selectedOption",selectedOption)
      const res = await apiInstance.post(
        `/upload/${decodedToken?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data?.success) {
        toast.success(res.data.success);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setFile(null);
        setSelectedOption(null)
        setIsSubmitting(false);
      } else {
        toast.error(res.data.error);

        throw new Error("Failed to connect to the backend server");
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl extrabold text-black">Become an Expert</h1>
      <div className="mt-2">
        <button
          onClick={() => handleOptionClick("Mind")}
          className={`w-36 rounded border medium text-lg ${
            selectedOption === "Mind" ? "bg-[#5AA17F] " : "bg-[#5AA17F] bg-opacity-10 hover:bg-[#5AA17F]"
          }`}

        >
          Fit Mind
        </button>
        <button
          onClick={() => handleOptionClick("Body")}
          className={`w-36 rounded border medium text-lg ${
            selectedOption === "Body" ? "bg-[#FF793B] " : "bg-[#FF793B] bg-opacity-10 hover:bg-[#FF793B]"
          }`}
        >
          Fit Body
        </button>
      </div>
      <form className="w-72 p-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            name="document"
            onChange={handleFileChange}
            type="file"
            accept=".pdf, .doc, .docx"
            placeholder="Upload your documents"
            className="w-72 px-3 py-2 rounded border light border-gray-300 focus:outline-none"
          />
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-72 py-2 px-4 bg-black text-white semibold rounded hover:bg-gray-800 focus:outline-none ${
            isSubmitting ? "opacity-35" : ""
          }`}
        >
          Start Advising
        </button>
      </form>
    </div>
  );
}

export default Form;
