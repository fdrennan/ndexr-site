import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import InstanceItem from "./InstanceItem";
import Spinner from "../layout/Spinner";
import InstanceContext from "../../context/instance/instanceContext";

const Instance = () => {
  const instanceContext = useContext(InstanceContext);
  const { instances, getInstances, loading } = instanceContext;

  useEffect(() => {
    getInstances();
    // eslint-disable-next-line
  }, []);

  if (instances !== null && instances.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  const refreshInstances = () => {
    getInstances();
  };

  if (instances === "false") {
    return <div>Create an instance to get started</div>;
  }

  return (
    <div>
      <div className="container">
        <h2 className="div-left text-primary">Created Servers</h2>
        <button
          className="fas fa-sync-alt div-right fa-center"
          onClick={refreshInstances}
        />
      </div>
      <br />
      <div>
        {instances !== null && !loading ? (
          <TransitionGroup>
            {instances.map(instance => (
              <CSSTransition
                key={instance.instance_id}
                timeout={500}
                classNames="item"
              >
                <InstanceItem instance={instance} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Instance;
