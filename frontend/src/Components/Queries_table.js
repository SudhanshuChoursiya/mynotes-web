import "../Pages/Dashboard.css";
import { useEffect, useState } from "react";
import ConfirmBox from "./Confirmbox.js";

const Userqueries = () => {
  const [contactData, setContactData] = useState([]);
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState();
const base_url=process.env.REACT_APP_BASE_URL

  const deleteApiUrl = `${base_url}/delete-userquery/`;

  const getQueryData = async () => {
    const response = await fetch(`${base_url}/getClientData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      setContactData(data.details);
    }
  };

  const setShowAndGetid = (id) => {
    setItemId(id);
    setShow(true);
  };

  useEffect(() => {
    getQueryData();
  }, [contactData]);

  return (
    <>
      <div className="contact_container">
        <h3 className="caption">User-Queries</h3>
        <div className="table_container">
          <table className="table">
            <thead>
              <tr>
                <th>s.no</th>
                <th>name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Delete Record</th>
              </tr>
            </thead>
            <tbody>
              {contactData
                ? contactData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.mobileNo}</td>
                        <td>{item.subject}</td>
                        <td>{item.message}</td>
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

export default Userqueries;
