import React, { useContext, useState } from "react";
import { Collapse } from "react-collapse";

import InstanceContext from "../../context/instance/instanceContext";
import SecurityGroupContext from "../../context/securitygroup/securityGroupContext";
const InstanceItem = ({ instance }) => {
  const instanceContext = useContext(InstanceContext);
  const securityGroupContext = useContext(SecurityGroupContext);
  const {
    modifyInstance,
    clearCurrentInstance,
    getInstances
  } = instanceContext;

  const { createKeyFile } = securityGroupContext;

  const [hidden, setHidden] = useState(false);

  // useEffect(() => {
  //   console.log(instance);
  // }, []);
  const {
    image_id,
    instance_id,
    instance_type,
    state,
    instance_storage,
    public_ip_address,
    launch_time,
    login,
    key_name
  } = instance;

  const [instanceType, setInstanceType] = useState("");

  const onSetInstanceType = e => {
    e.preventDefault();
    setInstanceType(e.target.value);
    getInstances();
  };

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

  const onModify = () => {
    modifyInstance(instance_id, "modify", instanceType);
    clearCurrentInstance();
    getInstances();
  };

  const displayPem = () => {
    createKeyFile(key_name);
  };

  return (
    <div className="card bg-light fa-center">
      <button onClick={buttonPush} className="btn btn-primary btn-block">
        <div className="div-left">
          {!public_ip_address ? (
            <strong>{state[0].toUpperCase() + state.slice(1)}</strong>
          ) : (
            <strong>{public_ip_address}</strong>
          )}
        </div>
        <i className="fas fa-bars div-right" />
      </button>

      <Collapse isOpened={hidden}>
        <code>{login}</code>
        <ul className="list">
          {public_ip_address && (
            <li>
              <p>
                <strong>Public IP:</strong> {public_ip_address}
              </p>
            </li>
          )}
        </ul>
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
          {key_name && (
            <li>
              <button className="btn btn-success btn-sm" onClick={displayPem}>
                Display PEM in Console - To see push [CMD+OPT+I] in Chrome
              </button>
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
        {
          <div>
            <input
              type="text"
              placeholder="t2.xlarge"
              name="instanceType"
              value={instanceType}
              onChange={onSetInstanceType}
            />
            <button className="btn btn-danger btn-sm" onClick={onModify}>
              Modify
            </button>
          </div>
        }
      </Collapse>
    </div>
  );
};

export default InstanceItem;
