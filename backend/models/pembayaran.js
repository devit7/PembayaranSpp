'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.petugas,{
        foreignKey:"id_petugas",
        as:"petugas"
      })
      this.belongsTo(models.siswa,{
        foreignKey:"nisn",
        as:"siswa"
      })
    }
  };
  pembayaran.init({
    id_pembayaran: {
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    id_petugas:DataTypes.INTEGER,
    nisn:DataTypes.CHAR,
    tgl_bayar: DataTypes.INTEGER,
    bulan_spp: DataTypes.INTEGER,
    tahun_spp: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pembayaran',
    tableName: 'pembayaran',
    freezeTableName:true
  });
  return pembayaran;
};