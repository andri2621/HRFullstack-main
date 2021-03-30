const photos = (sequelize, DataTypes) => {
    const Photos = sequelize.define('employees_images', {
        epim_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        epim_filename: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        epim_path: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        epim_primary: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        epim_employee_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'employees',
            key: 'employee_id'
          }
        }
      }, {
        sequelize,
        tableName: 'employees_images',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "employees_images_pkey",
            unique: true,
            fields: [
              { name: "epim_id" },
            ]
          },
        ]
      });

      Photos.associate = models => {
        Photos.belongsTo(models.Employees,{foreignKey: 'epim_employee_id'});
      };

      return Photos;
}
export default photos;