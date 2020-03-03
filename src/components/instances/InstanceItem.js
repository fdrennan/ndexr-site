import React, { useContext } from "react";
import PropTypes from "prop-types";
import InstanceContext from "../../context/instance/instanceContext";

const InstanceItem = ({ instance }) => {
  const instanceContext = useContext(InstanceContext);
  const { deleteInstance, setInstance, clearCurrentInstance } = instanceContext;

  const { _id, name, email, phone, type } = instance;
  const onDelete = () => {
    console.log("Deleteing");
    deleteInstance(_id);
    clearCurrentInstance();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name} {/*<span*/}
        {/*  style={{ float: "right" }}*/}
        {/*  className={*/}
        {/*    "badge " +*/}
        {/*    (type === "professional" ? "badge-success" : "badge-primary")*/}
        {/*  }*/}
        {/*>*/}
        {/*  {type.charAt(0).toUpperCase() + type.slice(1)}*/}
        {/*</span>*/}
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setInstance(instance)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

InstanceItem.propTypes = {
  instance: PropTypes.object.isRequired
};

export default InstanceItem;
