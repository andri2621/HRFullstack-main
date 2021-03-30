const regionsImage = (sequelize, DataTypes) => {
    const RegionsImage = sequelize.define('regions_images', {
        reim_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        reim_filename: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        reim_path: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        reim_region_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'regions',
                key: 'region_id'
            }
        }
    }, {
        sequelize,
        tableName: 'regions_images',
        schema: 'public',
        timestamps: false

    });

    return RegionsImage;
};

export default regionsImage;
