import React, { useState, useEffect } from 'react'
import { create,update } from './ApiRegion';

export default function AddEditDialog(props) {

    const [values, setValues] = useState({
        region_id: '',
        region_name: ''
    });


    useEffect(() => {
        const region = props.data;

        if (props.data !== null && props.actionType==='Edit') {
            setValues({
                ...values,
                region_id: region.region_id,
                region_name: region.region_name
            });
 
        }else{
            setValues({
                ...values,
                region_id: '',
                region_name: ''
            });
        }
        


    }, [])


    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (props.actionType==='Add'){

            const region = {
                region_id: values.region_id || undefined,
                region_name: values.region_name || undefined
            }
    
            create(region).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, error: '', open: true });
         
                }
            })
        }else if (props.actionType==='Edit'){
            update(values).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, error: '', open: true });
                    
                }
          
            })
        }

        props.setModal(false);
        props.setSubmit(true);
    }

    

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-3 mx-auto max-w-sm">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                            <h6 className="text-gray-500 text-sm mt-1 mb-6 font-bold uppercase">
                                {props.actionType ==='Add' ? 'Add Region' : 'Edit Region'}
                                </h6>
                            <button onClick={() => props.setModal(false)}
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                    </span>
                            </button>
                        </div>
                        {/*body*/}
                        <form action="#" method="POST">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3 hidden">
                                        <label for="region_id" class="block text-sm font-medium text-gray-700">Region Id</label>
                                        <input type="text" name="region_id" id="region_id"
                                            value={values.region_id} onChange={handleChange('region_id')}
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="region_name" class="block text-sm font-medium text-gray-500">Region Name</label>
                                        <input type="text" name="region_name" id="region_name"
                                            placeholder="e.g (Asia)"
                                            value={values.region_name} onChange={handleChange('region_name')}
                                            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border-gray-200 rounded-md" />
                                    </div>

                                </div>
                            </div>
                        </form>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button onClick={() => props.setModal(false)}
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Close
                                    </button>
                            <button type="submit" onClick={onSubmit} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save
                                 </button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
