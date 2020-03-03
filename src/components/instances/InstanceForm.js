import React, { useState, useContext, useEffect } from "react";
import InstanceContext from "../../context/instance/instanceContext";

const InstanceForm = () => {
  const instanceContext = useContext(InstanceContext);

  const {
    addInstance,
    updateInstance,
    clearCurrentInstance,
    instance
  } = instanceContext;

  useEffect(() => {
    if (instance !== null) {
      setInstance(instance);
    } else {
      setInstance({
        name: "",
        email: "",
        phone: "",
        type: "personal",
        instanceType: "",
        pemKey: ""
      });
    }
  }, [instanceContext, instance]);

  const [currentInstance, setInstance] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
    instanceType: "",
    pemKey: ""
  });

  const { name, email, phone, type, instanceType, pemKey } = currentInstance;

  const onChange = e =>
    setInstance({ ...currentInstance, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (instance === null) {
      addInstance(currentInstance);
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
        {instance ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="t2.nano"
        name="instanceType"
        value={instanceType}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Key Name"
        name="pemKey"
        value={pemKey}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={instance ? "Update Contact" : "Add Contact"}
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
