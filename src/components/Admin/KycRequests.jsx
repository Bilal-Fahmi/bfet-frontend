import DataTable from "react-data-table-component";
import { apiInstance } from "../../axiosInstance/Instance";
import { useEffect, useState } from "react";

function KycRequests() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await apiInstance.get("/admin/kyc-requests").then((res) => {
        const SerialNo = res.data.user.map((users, index) => ({
          ...users,
          serialNo: index + 1,
        }));

        setData(SerialNo);
      });

      if (!res) throw new Error("Kyc requests not found");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (email) => {
    try {
      console.log(email);
      const res = await apiInstance.get(`/kyc-link/${email}`)
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "Serial No",
      selector: (row) => row.serialNo,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Id",
      selector: (row) => row._id,
    },
    {
      name: "Kyc",
      selector: (row) => (
        <button
          className="bg-yellow-200"
          onClick={() => handleSubmit(row.email)}
        >
          Send KYC
        </button>
      ),
    },
  ];
  return (
    <div className="light p-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default KycRequests;
