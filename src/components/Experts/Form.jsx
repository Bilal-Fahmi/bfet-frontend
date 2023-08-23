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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
    }
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("document", file);
      const res = await apiInstance.post(
        `/upload/${decodedToken?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data) {
        toast.success(res.data.message);
        console.log(res.data);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setFile(null);
        setIsSubmitting(false);
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
        throw new Error("Failed to connect to the backend server");
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  // let message;
  // if (touched.email && errors?.email) {
  //   message = errors.email;
  // } else if (touched.password && errors?.password) {
  //   message = errors.password;
  // }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl extrabold text-black">Become an Expert</h1>
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
