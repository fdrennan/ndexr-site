import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import InstanceItem from "./InstanceItem";
import Spinner from "../layout/Spinner";
import InstanceContext from "../../context/instance/instanceContext";
const Instance = () => {
  // sleep time expects milliseconds
  const instanceContext = useContext(InstanceContext);

  const { instances, filtered, getInstances, loading } = instanceContext;

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

  return (
    <Fragment>
      <button type="button" onClick={refreshInstances}>
        Click Me!
      </button>
      {instances !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(instance => (
                <CSSTransition
                  key={instance.instance_id}
                  timeout={500}
                  classNames="item"
                >
                  <InstanceItem instance={instance} />
                </CSSTransition>
              ))
            : instances.map(instance => (
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
    </Fragment>
  );
};

export default Instance;
