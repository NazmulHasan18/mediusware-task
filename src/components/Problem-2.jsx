import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import ModalFooterBtn from "./ModalFooterBtn";

const Problem2 = () => {
   const [showA, setShowA] = useState(false);
   const [showB, setShowB] = useState(false);
   const [allContact, setAllContact] = useState({});
   const [usContact, setUsContact] = useState({});
   const [checked, setChecked] = useState(false);
   const [entered, setEntered] = useState(false);

   const handelCheckBox = (e) => {
      const check = e.target.checked;
      setChecked(check);
   };
   const handleCloseA = () => setShowA(false);
   const handleShowA = (link) => {
      setShowB(false);
      setShowA(true);

      fetch(link)
         .then((res) => res.json())
         .then((data) => {
            setAllContact(data);
         });
   };

   const handleCloseB = () => setShowB(false);
   const handleShowB = (link) => {
      setShowA(false);
      setShowB(true);
      fetch(link)
         .then((res) => res.json())
         .then((data) => setUsContact(data));
   };

   const handelSearchAll = (e) => {
      e.preventDefault();

      const text = e.target.search.value;
      fetch(`https://contact.mediusware.com/api/contacts/?search=${text}`)
         .then((res) => res.json())
         .then((data) => setAllContact(data));
   };
   const handelOnChangeSearchAll = (e) => {
      setTimeout(() => {
         const text = e.target.value;
         fetch(`https://contact.mediusware.com/api/contacts/?search=${text}`)
            .then((res) => res.json())
            .then((data) => setAllContact(data));
      }, 2000);
   };
   const handelSearchUs = (e) => {
      e.preventDefault();

      const text = e.target.search.value;
      fetch(`https://contact.mediusware.com/api/contacts/?search=${text}`)
         .then((res) => res.json())
         .then((data) => setUsContact(data));
   };
   const handelOnChangeSearchUs = (e) => {
      setTimeout(() => {
         const text = e.target.value;
         fetch(`https://contact.mediusware.com/api/contacts/?search=${text}`)
            .then((res) => res.json())
            .then((data) => setUsContact(data));
      }, 2000);
   };

   useEffect(() => {
      console.log(usContact);
   }, [usContact]);
   return (
      <div className="container">
         <div className="row justify-content-center mt-5">
            <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

            <div className="d-flex justify-content-center gap-3">
               <button
                  className="btn btn-lg btn-outline-primary"
                  type="button"
                  onClick={() => handleShowA("https://contact.mediusware.com/api/contacts/?page=1")}
               >
                  All Contacts
               </button>
               <button
                  className="btn btn-lg btn-outline-warning"
                  type="button"
                  onClick={() =>
                     handleShowB(
                        "https://contact.mediusware.com/api/country-contacts/United%20States/?page=1"
                     )
                  }
               >
                  US Contacts
               </button>
            </div>
         </div>
         {/* modal a */}
         <>
            <Modal show={showA} onHide={handleCloseA}>
               <Modal.Header closeButton>
                  <Modal.Title>Modal A</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form onSubmit={handelSearchAll}>
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Search</Form.Label>
                        <Form.Control
                           onChange={handelOnChangeSearchAll}
                           name="search"
                           type="number"
                           placeholder="Search..."
                        />
                     </Form.Group>
                  </Form>
                  <Table striped bordered hover variant="light">
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Phone Number</th>
                           <th>Country Name</th>
                        </tr>
                     </thead>
                     <tbody>
                        {allContact.results?.map((number) => (
                           <tr key={number.id} className={`${checked && number.id % 2 !== 0 && "d-none"}`}>
                              <td>{number.id}</td>
                              <td>{number.phone}</td>
                              <td>{number.country.name}</td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
                  <Button
                     onClick={() => {
                        handleShowA(allContact.previous);
                     }}
                     disabled={allContact.previous ? false : true}
                     className="me-2"
                  >
                     Prev
                  </Button>
                  <Button
                     onClick={() => {
                        handleShowA(allContact.next);
                     }}
                     disabled={allContact.next ? false : true}
                  >
                     Next
                  </Button>
               </Modal.Body>
               <Modal.Footer className="d-flex justify-content-between align-items-center">
                  <Form.Check
                     inline
                     label="Only Even"
                     name="even"
                     type="checkbox"
                     id="even"
                     onChange={handelCheckBox}
                  />
                  <ModalFooterBtn
                     handleCloseA={handleCloseA}
                     handleShowA={handleShowA}
                     handleShowB={handleShowB}
                  ></ModalFooterBtn>
                  {/* <div className="d-flex gap-2">
                     <Button
                        variant="secondary"
                        onClick={() => handleShowA("https://contact.mediusware.com/api/contacts/?page=1")}
                        style={{ backgroundColor: "#46139f" }}
                     >
                        All Contacts
                     </Button>
                     <Button variant="secondary" onClick={handleShowB} style={{ backgroundColor: "#ff7f50" }}>
                        US Contacts
                     </Button>
                     <Button variant="primary" onClick={handleCloseA} style={{ backgroundColor: "#46139f" }}>
                        Cancel
                     </Button>
                  </div> */}
               </Modal.Footer>
            </Modal>
         </>
         <>
            <Modal show={showB} onHide={handleCloseB}>
               <Modal.Header closeButton>
                  <Modal.Title>Modal B</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form onSubmit={handelSearchUs}>
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Search</Form.Label>
                        <Form.Control
                           onChange={handelOnChangeSearchUs}
                           name="search"
                           type="number"
                           placeholder="Search..."
                        />
                     </Form.Group>
                  </Form>
                  <Table striped bordered hover variant="light">
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Phone Number</th>
                           <th>Country Name</th>
                        </tr>
                     </thead>
                     <tbody>
                        {usContact.results?.map((number) => (
                           <tr key={number.id} className={`${checked && number.id % 2 !== 0 && "d-none"}`}>
                              <td>{number.id}</td>
                              <td>{number.phone}</td>
                              <td>{number.country.name}</td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
                  <Button
                     onClick={() => {
                        handleShowB(usContact.previous);
                     }}
                     disabled={usContact.previous ? false : true}
                     className="me-2"
                  >
                     Prev
                  </Button>
                  <Button
                     onClick={() => {
                        handleShowB(usContact.next);
                     }}
                     disabled={usContact.next ? false : true}
                  >
                     Next
                  </Button>
               </Modal.Body>
               <Modal.Footer className="d-flex justify-content-between align-items-center">
                  <Form.Check
                     inline
                     label="Only Even"
                     name="even"
                     type="checkbox"
                     id="even"
                     onChange={handelCheckBox}
                  />
                  <ModalFooterBtn
                     handleCloseB={handleCloseB}
                     handleShowA={handleShowA}
                     handleShowB={handleShowB}
                  ></ModalFooterBtn>
               </Modal.Footer>
            </Modal>
         </>
      </div>
   );
};

export default Problem2;
