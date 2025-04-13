import "./home.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../searchContext.js";
import NotLoginBox from "../Components/NotLoginError.js";
import CardSkeleton from "../Components/CardSkeleton.js";
import ReactPaginate from "react-paginate";

const Homepage = () => {
  const [show, setShow] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [isPageChange, setIsPageChange] = useState(false);

  const {
    getNotes,
    notes,
    notFound,
    query,
    page,
    setPage,
    total,
    loading,
    setLoading,
  } = useContext(AppContext);

  const userToken = localStorage.getItem("5h&3hdh&$cud@67#hfj");

  const adminToken = localStorage.getItem("f@&uhdjxjd$64$68#hd");

  const base_url = process.env.REACT_APP_BASE_URL;
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const img_url = `${backend_url}/notes_images`;
  const file_url = `${backend_url}/notes_files`;

  const handlePageClick = (currentPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(currentPage.selected + 1);
  };

  useEffect(() => {
    if (userToken || adminToken) {
      setLoggedin(true);
    }
  }, []);

  useEffect(() => {
    getNotes();
    window.scrollTo({top:0,left:0,behaviour:'smooth'})
  }, [page]);

  useEffect(() => {
    if (query.length === 0) {
      getNotes();
    }
  }, [query]);

  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <>
      <section className="main_container_of_notes_card">
        {notes.length !== 0 ? (
          notes.map((item, index) => {
            return (
              <div className="cardContainer" key={index}>
                <div className="mainCardContainer shadow-sm">
                  <div className="imgContainer">
                    <img src={`${img_url}/${item.img_src}`} alt="img" />
                  </div>

                  <div className="TexualContentContainer">
                    <div>
                      <h1>{item.title}</h1>
                    </div>

                    {loggedin ? (
                      <div className="btnContainer">
                        <Link to={`/pdf-view-page/${item._id}`}>
                          <button className="cardBtn">Open now</button>
                        </Link>

                        <a href={`${file_url}/${item.file_src}`}>
                          <button className="cardBtn">download</button>
                        </a>
                      </div>
                    ) : (
                      <div className="btnContainer">
                        <button
                          className="cardBtn"
                          onClick={() => setShow(true)}
                        >
                          Open now
                        </button>

                        <button
                          className="cardBtn"
                          onClick={() => setShow(true)}
                        >
                          download
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div class="noresultfound">
              <p>Sorry! your search “ {query} ” did not match any notes.</p>
            </div>
            <div class="d-flex flex-column nodatabody mx-4">
              <h4 class="mt-3 mx-3">Suggestions:</h4>

              <ul>
                <li>Make sure that all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
              </ul>
            </div>
          </div>
        )}
        {!query.length > 0 ? (
          <ReactPaginate
            containerClassName="pageBtnContainer"
            activeClassName="active"
            forcePage={page - 1}
            previousClassName="previousBtnContainer"
            nextClassName="nextBtnContainer"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(total / 5)}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        ) : (
          ""
        )}
      </section>

      <NotLoginBox show={show} setShow={setShow} />
    </>
  );
};

export default Homepage;
