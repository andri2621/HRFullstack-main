import { sequelize } from '../models/IndexModel';

// findAll = select * from regions
const findAll = async (req, res) => {
    const regions = await req.context.models.Regions.findAll(
        {
            include: [{
                model: req.context.models.Countries
            }]
        } 
    );
    return res.send(regions);
}


const findRegionById = async (req, res) => {
    const regions = await sequelize.query('SELECT * FROM regions where region_name = :regionName',
        { replacements: { regionName: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT,
        model: req.context.models.Regions,
        mapToModel: true } 
    ).then(function (regions) {
        console.log(regions)
    })
    return res.send(regions);
}

const create = async (req, res) => {
    const { region_id, region_name } = req.body;
    const regions = await req.context.models.Regions.create({
      region_id: region_id,
      region_name: region_name,
    });
  
    return res.send(regions);
}

const update = async (req, res) => {
    const { region_name } = req.body;
    const regions = await req.context.models.Regions.update(
        {region_name: region_name},// nama attribute yg akan di update
        {returning: true,where: { region_id: req.params.id } });


      return res.send(regions);
}

const remove = async (req, res) => {
    const {id} = req.params;
    const result = await req.context.models.Regions.destroy({
        where: { region_id: id },
      });
    
      return res.send(true);
}


// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
    findAll,
    findRegionById,
    create,
    update,
    remove
}