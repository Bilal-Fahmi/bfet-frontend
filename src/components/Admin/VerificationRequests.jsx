import DataTable from "react-data-table-component";
import { apiInstance } from "../../axiosInstance/Instance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal nextui/Modal";
import { Button } from "@nextui-org/react";

function VerificationRequests() {
  const passSize = "xs";
  const [data, setData] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await apiInstance
        .get("/admin/verification-requests")
        .then((res) => {
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
      const res = await apiInstance.post("/admin/verification-link", {
        email: email,
      });

      console.log(res.data);
      if (res.data?.success) {
        toast.success(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const roleUpdate = async (email) => {
    try {
      const res = await apiInstance.post("admin/update-role", { email: email });
      console.log(res.data.success);
      if (res.data?.success) {
        toast.success(res.data.success);
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
      name: "Option",
      selector: (row) => row.selectedOption,
    },
    {
      name: "Verify",
      selector: (row) => (
        <Button
          size="sm"
          className="bg-yellow-200"
          onClick={() => handleSubmit(row.email)}
        >
          Send link
        </Button>
      ),
    },
    {
      name: "Update Role",
      selector: (row) => (
        <Modal
          passSize={passSize}
          headerText="Update Role"
          body="Verification done? Update the role to expert"
          onRoleUpdate={() => roleUpdate(row.email)}
        />
      ),
    },
  ];
  return (
    <div className="semibold p-8 w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default VerificationRequests;
