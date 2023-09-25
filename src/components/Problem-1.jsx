import React, { useEffect, useState } from "react";

const Problem1 = () => {
   const [show, setShow] = useState("all");

   const [data, setData] = useState([]);
   const [sortData, setSortData] = useState(data);

   const handelSubmit = (e) => {
      let informationArr = [...data];
      e.preventDefault();
      const name = e.target.name.value;
      const status = e.target.status.value;
      const obj = { name, status };
      informationArr.push(obj);
      setData(informationArr);
      setSortData(informationArr);
      e.target.reset();
   };

   const handleClick = (val) => {
      setShow(val);
      const activeData = data.filter((singleData) => singleData.status.toLowerCase() === "active");
      const completedData = data.filter((singleData) => singleData.status.toLowerCase() === "completed");
      const restData = data.filter(
         (singleData) =>
            singleData.status.toLowerCase() !== "active" && singleData.status.toLowerCase() !== "completed"
      );
      if (val === "all") {
         let sortArr = [];
         sortArr.push(...activeData);
         sortArr.push(...completedData);
         sortArr.push(...restData);
         setSortData(sortArr);
      } else if (val === "active") {
         setSortData(activeData);
      } else if (val === "completed") {
         setSortData(completedData);
      }
   };

   return (
      <div className="container">
         <div className="row justify-content-center mt-5">
            <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
            <div className="col-6 ">
               <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handelSubmit}>
                  <div className="col-auto">
                     <input type="text" className="form-control" placeholder="Name" name="name" />
                  </div>
                  <div className="col-auto">
                     <input type="text" className="form-control" placeholder="Status" name="status" />
                  </div>
                  <div className="col-auto">
                     <button type="submit" className="btn btn-primary">
                        Submit
                     </button>
                  </div>
               </form>
            </div>
            <div className="col-8">
               <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item">
                     <button
                        className={`nav-link ${show === "all" && "active"}`}
                        type="button"
                        onClick={() => handleClick("all")}
                     >
                        All
                     </button>
                  </li>
                  <li className="nav-item">
                     <button
                        className={`nav-link ${show === "active" && "active"}`}
                        type="button"
                        onClick={() => handleClick("active")}
                     >
                        Active
                     </button>
                  </li>
                  <li className="nav-item">
                     <button
                        className={`nav-link ${show === "completed" && "active"}`}
                        type="button"
                        onClick={() => handleClick("completed")}
                     >
                        Completed
                     </button>
                  </li>
               </ul>
               <div className="tab-content"></div>
               <table className="table table-striped ">
                  <thead>
                     <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {sortData.map((singleData, index) => (
                        <tr key={index}>
                           <td>{singleData.name}</td>
                           <td>{singleData.status}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default Problem1;
