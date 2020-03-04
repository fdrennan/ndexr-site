import React, { useContext } from "react";
import PropTypes from "prop-types";
import InstanceContext from "../../context/instance/instanceContext";

const InstanceItem = ({ instance }) => {
  const instanceContext = useContext(InstanceContext);
  const {
    deleteInstance,
    setInstance,
    clearCurrentInstance,
    getInstances
  } = instanceContext;

  const {
    user_id,
    creation_time,
    image_id,
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
    getInstances();
    clearCurrentInstance();
  };

  return (
    <div className="card bg-light">
      <ul className="list">
        {launch_time && (
          <li>
            <p>
              <strong>Launch Time:</strong> {launch_time}
            </p>
          </li>
        )}
        {public_ip_address && (
          <li>
            <p>
              <strong>Public IP Address:</strong> {public_ip_address}
            </p>
          </li>
        )}
        {instance_storage && (
          <li>
            <p>
              <strong>Instance Storage:</strong> {instance_storage}
            </p>
          </li>
        )}
        {image_id && (
          <li>
            <p>
              <strong>AMI Type:</strong> {image_id}
            </p>
          </li>
        )}
        {state && (
          <li>
            <p>
              <strong>Current State:</strong> {state}
            </p>
          </li>
        )}
        {instance_id && (
          <li>
            <p>
              <strong>Instance Id:</strong> {instance_id}
            </p>
          </li>
        )}
        {instance_type && (
          <li>
            <p>
              <strong>Instance Type:</strong> {instance_type}
            </p>
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
