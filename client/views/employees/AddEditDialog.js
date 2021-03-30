import React, { useState, useEffect } from 'react'
import { create} from './ApiEmployee';
import PageHeader from '../../components/headers/PageHeader'
import { useHistory } from "react-router-dom";


export default function AddEditDialog(props) {
    let history = useHistory();
    const [values, setValues] = useState({
        first_name: ''
    });


    const [blob, setBlob] = useState([]);
    const[files,setFiles] = useState([])


    const uploadSingleFile = name => event => {
        //1.untuk ubah file ke blob agar bisa di preview image nya
        setBlob({ ...blob, [name]:  URL.createObjectURL(event.target.files[0]) })
        
        //2. simpan data File, bisa juga gunakan blob, lalu blob diconvert lagi
        // ke File type, spy ga bingung kita coba gunakan cara ini aja
        setFiles({ ...files, [name]:  event.target.files[0] })
    }



    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const handleKeyPress = (e) => {
        if (e.keyCode == 13) {
            console.log('ON KEY PRESSvalue', e.target.value);
            // put the login here
        }
    }


    const onBack = () => {
        history.goBack();
    }

    const onSubmitEmployee = (event) => {
        event.preventDefault();
    }

    const onSubmitPhotos = (event) => {
        event.preventDefault();
        //1. kita gunakan formData, karena data yg dikirim ke backend
        // berupa text dan File multipart, pastikan di Form typenya multipart
        let empPhotos = new FormData()
        console.log(values.employee_id);
        console.log(files.image1);
        console.log(files.image2);
        values.employee_id && empPhotos.append('employee_id',values.employee_id);
        files.image1 && empPhotos.append('image',files.image1);
        files.image2 && empPhotos.append('image',files.image2);
        files.image3 && empPhotos.append('image',files.image3);


         create(empPhotos).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', open: true });
     
            }
        }) 


    }




    return (
        <>
            <PageHeader
                title={"Add Employees"}
                titleAction={"Back"}
                setShow={false}
                setGoBack={onBack}
            />

            <div>

                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-2">
                        <div className="px-4 sm:px-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Photos</h3>

                        </div>
                    </div>
                    <div className="px-4 mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST" enctype="multipart/form-data">
                            
                            <div className="shadow bg-white sm:rounded-md sm:overflow-hidden">
                            <label className="block text-sm font-medium text-gray-700">
                                                EmployeeId
                                            </label>
                            <input type="text" placeholder="EmployeeId e.g (100)" 
                            onChange={handleChange('employee_id')}
                            name="employee_id" id="employee_id"   />
                                <div class="flex flex-wrap">
                              
                                    {/* show card upload image */}

                                    <div className="bg-white space-y-6 sm:p-6">
                                        <div className="w-36">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Photo 1
                                            </label>

                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">

                                                    <div className="mx-auto h-48 w-24 text-gray-400">
                                                        <img src={blob.image1} alt='' className="mx-auto h-48 w-24"/>
                                                    </div>

                                                    <div className="flex text-sm text-gray-600">
                                                        <label for="image1" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                            <span>Upload a file</span>
                                                            <input id="image1" name="image1" onChange={uploadSingleFile('image1')} type="file" className="sr-only" />
                                                        </label>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="bg-white space-y-6 sm:p-6">
                                        <div className="w-36">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Photo 2
                                            </label>

                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">

                                                    <div className="mx-auto h-48 w-24 text-gray-400">
                                                    <img src={blob.image2} alt='' className="mx-auto h-48 w-24"/>
                                                    </div>

                                                    <div className="flex text-sm text-gray-600">
                                                        <label for="image2" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                            <span>Upload a file</span>
                                                            <input id="image2" name="image2" onChange={uploadSingleFile('image2')} type="file" className="sr-only" />
                                                        </label>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="bg-white space-y-6 sm:p-6">
                                        <div className="w-36">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Photo 3
                                            </label>

                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">

                                                    <div className="mx-auto h-24 w-24 text-gray-400">
                                                    <img src={blob.image3} alt='' className="mx-auto h-24 w-24"/>
                                                    </div>

                                                    <div className="flex text-sm text-gray-600">
                                                        <label for="image3" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                            <span>Upload a file</span>
                                                            <input id="image3" name="image3" onChange={uploadSingleFile('image3')} type="file" className="sr-only" />
                                                        </label>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>





                                </div>
                                {<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button onClick={onSubmitPhotos} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Save
                                    </button>
                                </div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
