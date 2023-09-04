import DataTable from "react-data-table-component";
import { apiInstance } from "../../axiosInstance/Instance";
import { useEffect, useState } from "react";

function Experts() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await apiInstance.get("/admin/experts").then((res) => {
        const expertsWithSerialNo = res.data.experts.map((experts, index) => ({
          ...experts,
          serialNo: index + 1,
        }));
        setData(expertsWithSerialNo);
      });
      if (!res) throw new Error("experts not found");
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
      name: "Option",
      selector: (row) => row.selectedOption,
    },
  ];

  return (
    <div className="light p-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Experts;
