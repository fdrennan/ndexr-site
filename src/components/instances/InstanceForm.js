import React, { useState, useContext, useEffect } from "react";
import InstanceContext from "../../context/instance/instanceContext";

const InstanceForm = () => {
  const instanceContext = useContext(InstanceContext);

  const {
    addInstance,
    updateInstance,
    clearCurrentInstance,
    instance,
    getInstances
  } = instanceContext;

  useEffect(() => {
    if (instance !== null) {
      setInstance(instance);
    } else {
      setInstance({
        instanceStorage: "60",
        instanceType: "t2.xlarge",
        pemKey: "Shiny",
        imageId: "ami-0f75bb5fd5fa9f972"
      });
    }
  }, [instanceContext, instance]);

  const [currentInstance, setInstance] = useState({
    instanceStorage: "60",
    instanceType: "t2.xlarge",
    pemKey: "Shiny",
    imageId: "ami-0f75bb5fd5fa9f972"
  });

  const { instanceType, pemKey, instanceStorage, imageId } = currentInstance;

  const onChange = e =>
    setInstance({ ...currentInstance, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (instance === null) {
      addInstance(currentInstance);
      getInstances();
    } else {
      updateInstance(currentInstance);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentInstance();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {instance ? "Edit Contact" : "Build Server"}
      </h2>
      <input
        type="text"
        placeholder="Instance Type: t2.nano"
        name="instanceType"
        value={instanceType}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Image ID: ami-0fc20dd1da406780b"
        name="imageId"
        value={imageId}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Instance Storage: 50"
        name="instanceStorage"
        value={instanceStorage}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="PEM: Key Name"
        name="pemKey"
        value={pemKey}
        onChange={onChange}
      />

      <div>
        <input
          type="submit"
          value={instance ? "Update Contact" : "Start Server"}
          className="btn btn-primary btn-block"
        />
      </div>
      {instance && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default InstanceForm;
