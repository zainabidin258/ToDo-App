import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontSize: 22,
};

export default function Table({ flag, setFlag }) {
  const [tasks, setTasks] = useState([]);
  const [modal, setmodal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div className="flex gap-x-4">
          <button
            onClick={() => {
              setData(params.row);
              setmodal(true);
              setTitle(params.row.title);
              setDescription(params.row.description);
              setEdit(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={async () => {
              await supabase.from("Tasks").delete().eq("id", params.row.id);
              setFlag((flag) => !flag);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getTasks();
  }, [flag]);

  async function getTasks() {
    const { data } = await supabase.from("Tasks").select();
    setTasks(data);
  }
  return (
    <>
      <div className="grid flex-1">
        <div className="flex justify-between h-fit">
          <div className="flex-1"></div>
          <button
            className="border-2 bg-teal-600 font-semibold text-white border-slate-300 p-2 rounded-md px-5 m-5"
            onClick={() => {
              setmodal(true);
            }}
          >
            Add
          </button>
        </div>
        <Modal
          open={modal}
          onClose={() => {
            setmodal(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="text-center !px-4 font-2xl">Edit Form</div>
            <div className="flex gap-5 justify-between py-5">
              <label className="font-2xl">Title</label>
              <input
                className="border-black border rounded-lg "
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className="flex gap-5 justify-between">
              <label>Description</label>
              <input
                className="border-black border rounded-lg "
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-center gap-4 py-5">
              <button
                className="bg-red-700 rounded-md p-3 text-white"
                onClick={() => setmodal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-600 rounded-md p-3 text-white"
                onClick={async () => {
                  edit
                    ? await supabase
                        .from("Tasks")
                        .update({
                          title,
                          description,
                        })
                        .eq("id", data.id)
                    : await supabase.from("Tasks").insert({
                        title,
                        description,
                      });
                  setmodal(false);
                  setFlag((flag) => !flag);
                  setEdit(false);
                  setTitle("");
                  setDescription("");
                }}
              >
                {edit ? "Save" : "Add"}
              </button>
            </div>
          </Box>
        </Modal>
        <Box sx={{ height: "100%", width: "95%" }}>
          <DataGrid
            rows={tasks}
            columns={columns}
            style={{
              color: "white",
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
}
