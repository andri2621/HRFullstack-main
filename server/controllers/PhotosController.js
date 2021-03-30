
const findAll = async (req, res) => {
    const result = await req.context.models.Photos.findAll(
    );
    return res.send(result);
}


const create = async (req,res) => {
    const { filename, path, is_primary, employee_id } = photos;
    const result = await req.context.models.Photos.create({
        epim_filename: filename,
        epim_path: path,
        epim_primary: is_primary,
        epim_employee_id: employee_id
    }).catch((error) => {
        console.log(error)
     });

    res.send(result)
}

const update = async (req, res) => {
    const { filename, path, is_primary, employee_id } = req.body;
    const result = await req.context.models.Photos.update(
        {
            epim_filename: filename,
            epim_path: path,
            epim_primary: is_primary,
            epim_employee_id: employee_id
        },// nama attribute yg akan di update
        { returning: true, where: { epim_id: req.params.id } });


    return res.send(result);
}

const remove = async (req, res) => {
    const { id } = req.params;
    const result = await req.context.models.Photos.destroy({
        where: { epim_id: id },
    });

    return res.send(result);
}


// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
    findAll,
    create,
    update,
    remove
}