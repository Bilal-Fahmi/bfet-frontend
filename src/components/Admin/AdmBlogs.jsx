import { useEffect, useState } from "react"
import { apiInstance } from "../../axiosInstance/Instance"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"


export default function AdmBlogs() {
    const [blogData, setBlogData] = useState([])
    useEffect(() => {
        fetchData()
    },[])
    const fetchData = async() => {
 try {
     const res = await apiInstance
         .get('/admin/blogs')
         .then((res) => {
             const blogsWithSerilNo = res.data.blogs.map((blogs, index) => ({
                 ...blogs,
                 serialNo:index+1
             }))
             setBlogData(blogsWithSerilNo)
         })
     if(!res) throw new Error("Blogs not found")
 } catch (error) {
     console.log(error);
        }
    }
    const columns = [
        {
            name: "Serial No",
            selector: (row) => row.serialNo,
            sortable: true,
          },
          {
            name: "Blog",
              cell: (row) => (
               <Link to={`/blog/${row._id}`} className="underline text-blue-500">View page</Link>
              ),
          },
          {
            name: "Status",
            cell: (row) => (
              <div className="flex items-center">
                {/* <Switch
                  onChange={(checked) => handleToggleStatus(row._id, checked)}
                  checked={row.iSBlock}
                  onColor="#ff0000" // Red color when blocked
                  offColor="#00ff00" // Green color when not blocked
                /> */}
              </div>
            ),
              ignoreRowClick: true,
          },
    ]
    return (
        <div className="semibold  p-8 w-full ">
            <DataTable columns={columns} data={blogData}/>
        </div>
    )
}