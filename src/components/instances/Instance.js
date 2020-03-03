import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import InstanceItem from "./InstanceItem";
import Spinner from "../layout/Spinner";
import InstanceContext from "../../context/instance/instanceContext";
import RtestContext from "../../context/rtest/rtestContext";

const Instance = () => {
  const instanceContext = useContext(InstanceContext);
  const rtestContext = useContext(RtestContext);

  const { contacts, filtered, getContacts, loading } = instanceContext;

  const { getdata } = rtestContext;

  useEffect(() => {
    getContacts();
    getdata();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <InstanceItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <InstanceItem contact={contact} />
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
