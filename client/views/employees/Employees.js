import React, { useState, useEffect, useRef } from 'react'
import PageHeader from '../../components/headers/PageHeader'
import TableEmployee from './TableEmployee';
import AddEditDialog from './AddEditDialog';
import { list } from './ApiEmployee'
import { Link, withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";


export default function Employees() {
  let history = useHistory();
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [action, setAction] = useState("Add");
  const mounted = useRef(true);
  const [modal, setModal] = useState(false);
  const [notif, setNotif] = useState(false);

  useEffect(() => {
    mounted.current = true;
    const abortController = new AbortController()
    const signal = abortController.signal;

    if (employees.length && !notif) {
      return;
    }

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        if (mounted.current) {
          console.log(data);
          setEmployees(data)
        }

      }
    });

    return () => {
      mounted.current = false;
      abortController.abort()
    }
  }, [notif === true]);

/*   const onCreate = withRouter(({ history }) => (

    console.log('pick me')

  )) */

  const onCreate = () => {
    history.push('/emp/add')
  }


  const onSubmit = async () => {
    if (notif === false) {
      setNotif(true)
    }
    setNotif(true)
  }



  return (
    <>
      <PageHeader
        title={"Employees"}
        titleAction={"Add"}
        setShow={true}
        setOnCreate={onCreate}
      />
      <TableEmployee
        datasource={employees} />
      {/* 
      {modal ? <AddEditDialog
        actionType={action}
        setModal={setModal}
        setSubmit={onSubmit}
      /> : null} */}
    </>
  )
}
