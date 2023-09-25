import React from "react";
import { Button } from "react-bootstrap";

const ModalFooterBtn = ({ handleCloseB, handleShowA, handleShowB, handleCloseA }) => {
   return (
      <div className="d-flex gap-2">
         <Button
            style={{ background: "white", color: "#46139f" }}
            onClick={() => handleShowA("https://contact.mediusware.com/api/contacts/?page=1")}
         >
            All Contacts
         </Button>
         <Button
            onClick={() =>
               handleShowB("https://contact.mediusware.com/api/country-contacts/United%20States/?page=1")
            }
            style={{ color: "#ff7f50" }}
         >
            US Contacts
         </Button>
         <Button
            onClick={handleCloseB || handleCloseA}
            className="text-black"
            style={{ backgroundColor: "#fff", border: "1px solid #46139f" }}
         >
            Cancel
         </Button>
      </div>
   );
};

export default ModalFooterBtn;
