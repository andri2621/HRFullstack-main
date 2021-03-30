//1. import module sequelize agar bisa create connection ke postgresdb
import Sequelize from 'sequelize';
import config from '../../config/config'
import RegionModel from './RegionModel'
import UserModel from './UserModel'
import RegionImageModel from './RegionImageModel'
import EmployeeModel from './EmployeeModel';
import PhotoModel from './PhotoModel'
import CountryModel from './CountriesModel'



//2. config database option akan di load dari file .env
const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect: 'postgres',
  },
);

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.log(err));

// tambahkan object Sequelize Op dan export spy bisa di pake di controller
const Op = Sequelize.Op;

//3. import all model dan store di variable models
/*  const models = {
  Regions: sequelize.import('./RegionModel')
};   
 */

// replace sequelize.import menggunakan import biasa, lalu
// create init class model nya
const models = {
  Regions: RegionModel(sequelize, Sequelize),
  RegionsImage: RegionImageModel(sequelize, Sequelize),
  Users : UserModel(sequelize,Sequelize),
  Employees: EmployeeModel(sequelize, Sequelize),
  Photos : PhotoModel(sequelize,Sequelize),
  Countries : CountryModel(sequelize,Sequelize)
};   


//4. create relation OneToMany | ManyToMany
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

// 5. export sequalize agar bisa di-call di module lain
export { sequelize, Op };
export default models;
