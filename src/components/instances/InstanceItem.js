import React, { useContext, useState } from "react";
import { Collapse } from "react-collapse";

import InstanceContext from "../../context/instance/instanceContext";

const InstanceItem = ({ instance }) => {
  const instanceContext = useContext(InstanceContext);

  const {
    modifyInstance,
    clearCurrentInstance,
    getInstances
  } = instanceContext;

  const [hidden, setHidden] = useState(false);

  const {
    image_id,
    instance_id,
    instance_type,
    state,
    instance_storage,
    public_ip_address,
    launch_time,
    login
  } = instance;

  const onDelete = () => {
    modifyInstance(instance_id, "terminate");
    clearCurrentInstance();
    getInstances();
  };

  const buttonPush = () => {
    setHidden(!hidden);
  };

  const startServer = () => {
    modifyInstance(instance_id, "start");
    clearCurrentInstance();
    getInstances();
  };

  const stopServer = () => {
    modifyInstance(instance_id, "stop");
    clearCurrentInstance();
    getInstances();
  };

  return (
    <div className="card bg-light">
      <p className={"btn btn-dark btn-block"}>
        {!public_ip_address ? (
          <strong>{state[0].toUpperCase() + state.slice(1)}</strong>
        ) : (
          <strong>Public IP: {public_ip_address}</strong>
        )}
      </p>
      <Collapse isOpened={hidden}>
        {login}
        <ul className="list">
          {launch_time && (
            <li>
              <p>
                <strong>Launch Time:</strong> {launch_time}
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
          {instance_type && (
            <li>
              <p>
                <strong>Instance Type:</strong> {instance_type}
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

          {instance_id && (
            <li>
              <p>
                <strong>Instance Id:</strong> {instance_id}
              </p>
            </li>
          )}
        </ul>
        {
          <p>
            <button className="btn btn-success btn-sm" onClick={startServer}>
              Start
            </button>
            <button className="btn btn-white btn-sm" onClick={stopServer}>
              Stop
            </button>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>
              Terminate
            </button>
          </p>
        }
      </Collapse>
      <button onClick={buttonPush} className="btn btn-primary btn-block">
        {" "}
        {hidden ? "Collapse" : "Expand"}
      </button>
    </div>
  );
};

export default InstanceItem;
