import "../Pages/Dashboard.css";
import { useEffect, useState } from "react";
import ConfirmBox from "./Confirmbox.js";

const Yournotes = () => {
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState();
const base_url=process.env.REACT_APP_BASE_URL

  const deleteApiUrl = `${base_url}/delete-notes/`;

  const getNotesData = async () => {
    const response = await fetch(`${base_url}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      setNotes(data.notesData);
    }
  };

  const setShowAndGetid = (id) => {
    setItemId(id);
    setShow(true);
  };

  useEffect(() => {
    getNotesData();
  }, [notes]);

  return (
    <>
      <div className="contact_container">
        <h3 className="caption">User-Queries</h3>
        <div className="table_container">
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Image_src</th>
                <th>File_src</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Delete Notes</th>
              </tr>
            </thead>
            <tbody>
              {notes
                ? notes.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.img_src}</td>
                        <td>{item.file_src}</td>
                        <td>{item.subject}</td>
                        <td>{item.Class}</td>
                        <td>
                          <button
                            className="btn btn-danger delete_btn"
                            type="button"
                            id="deletebtn"
                            onClick={() => setShowAndGetid(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmBox
        url={deleteApiUrl}
        Id={itemId}
        show={show}
        setShow={setShow}
      />
    </>
  );
};

export default Yournotes;
