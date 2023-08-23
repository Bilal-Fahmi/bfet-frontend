import { useEffect, useState } from "react";
import DataTables from "react-data-table-component";
import { apiInstance } from "../../axiosInstance/Instance";
import Switch from "react-switch";

function UsersView() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiInstance
        .get("/admin/users")
        .then((response) => {
          const usersWithSerialNo = response.data.users.map((users, index) => ({
            ...users,
            serialNo: index + 1,
          }));
          setData(usersWithSerialNo);
        });
      console.log(response);
      if (!response) throw new Error("users not found");
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleStatus = async (userId, newStatus) => {
    try {
      const res = await apiInstance.post("/admin/status", {
        userId,
        iSBlock: newStatus,
      });
      console.log(res);
      if (res.data.success) {
        const updatedData = data.map((user) =>
          user._id === userId ? { ...user, iSBlock: newStatus } : user
        );
        setData(updatedData);
      }
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
      name: "Status",
      cell: (row) => (
        <div className="flex items-center">
          <Switch
            onChange={(checked) => handleToggleStatus(row._id, checked)}
            checked={row.iSBlock}
            onColor="#ff0000" // Red color when blocked
            offColor="#00ff00" // Green color when not blocked
          />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="light p-5">
      <DataTables columns={columns} data={data} />
    </div>
  );
}

export default UsersView;
