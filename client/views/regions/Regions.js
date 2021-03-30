import React, { useState, useEffect, useRef } from 'react'
import { list, remove } from './ApiRegion'
import PageHeader from '../../components/headers/PageHeader'
import TableRegion from './TableRegion';
import AddEditDialog from './AddEditDialog'


export default function Regions() {
    const [regions, setRegions] = useState([]);
    
    const [region, setRegion] = useState([]);
    const [action, setAction] = useState("Add");
    const mounted = useRef(true);
    const [modal, setModal] = useState(false);
    const [notif, setNotif] = useState(false);

    useEffect(() => {
        mounted.current = true;
        const abortController = new AbortController()
        const signal = abortController.signal;

        if (regions.length && !notif) {
            return;
        }

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                if (mounted.current) {
                    console.log(data);
                    setRegions(data)
                }

            }
        });

        return () => {
            mounted.current = false;
            abortController.abort()
        }
    }, [notif === true]);

    
    const onCreate = async() =>{
        setNotif(false);
        setModal(true);
        setAction("Add");
    }

    const onDelete = async (value) => {

        remove(value).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                console.log(response);
                setNotif(true);
            }
        });

        setNotif(false);
    }

    const onEdit = async (value) => {
        setNotif(false);
        setRegion(value);
        setModal(true);
    }

    const onSubmit = async () => {
        if (notif === false) {
            setNotif(true)
        }
        setNotif(true)
    }

    


    return (
        <>
            <PageHeader title={"Regions"} titleAction={"Add"}
            setShow={true}
                setOnCreate ={onCreate}/>
            
            <TableRegion 
            datasource={regions} 
            setDelete={onDelete} 
            setEdit={onEdit} 
            setAction={setAction} />
            
            {modal ? <AddEditDialog
                data={region}
                actionType={action}
                setModal={setModal}
                setSubmit={onSubmit}
            /> : null}
        </>
    )
}
