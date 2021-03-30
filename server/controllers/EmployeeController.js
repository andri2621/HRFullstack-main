import { sequelize } from '../models/IndexModel';


const findAll = async (req, res) => {
    const emps = await req.context.models.Employees.findAll(
        {
            include: [{
                model: req.context.models.Photos
            }]
        } 
    );
    return res.send(emps);
}

const create = async (req, res) => {
    const { region_id, region_name } = req.body;
    const regions = await req.context.models.Employees.create({
      region_id: region_id,
      region_name: region_name,
    });
  
    return res.send(regions);
}

// untuk simpan data filename ke table
const createEmpImages = async(req,res,formData)=>{
    const employeeId = formData.fields[0].value;
    const files = formData.files;
    files.map((row)=>{
        req.context.models.Photos.create({
            epim_filename: row.fileName,
            epim_path: `/uploads/${row.fileName}`,
            epim_primary: false,
            epim_employee_id: employeeId
        }).catch((error) => {
            console.log(error)
         });
    });

    console.log("EmployeeId : "+employeeId);
}


// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
    findAll,
    create,
    createEmpImages
}