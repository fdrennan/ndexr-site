import React, { useContext } from "react";
import PropTypes from "prop-types";
import InstanceContext from "../../context/instance/instanceContext";

const InstanceItem = ({ instance }) => {
  const instanceContext = useContext(InstanceContext);
  const { deleteInstance, setInstance, clearCurrentInstance } = instanceContext;

  const {
    user_id,
    creation_time,
    instance_id,
    instance_type,
    state,
    instance_storage,
    public_ip_address,
    launch_time
  } = instance;
  const onDelete = () => {
    console.log("Deleteing");
    deleteInstance(instance_id);
    clearCurrentInstance();
  };

  return (
    <div className="card bg-light">
      <ul className="list">
        {launch_time && (
          <li>
            <i className="fas fa-envelope-open" /> {launch_time}
          </li>
        )}
        {public_ip_address && (
          <li>
            <i className="fas fa-envelope-open" /> {public_ip_address}
          </li>
        )}
        {instance_storage && (
          <li>
            <i className="fas fa-envelope-open" /> {instance_storage}
          </li>
        )}
        {state && (
          <li>
            <i className="fas fa-envelope-open" /> {state}
          </li>
        )}
        {user_id && (
          <li>
            <i className="fas fa-envelope-open" /> {user_id}
          </li>
        )}
        {creation_time && (
          <li>
            <i className="fas fa-phone" /> {creation_time}
          </li>
        )}
        {instance_id && (
          <li>
            <i className="fas fa-phone" /> {instance_id}
          </li>
        )}
        {instance_type && (
          <li>
            <i className="fas fa-phone" /> {instance_type}
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
