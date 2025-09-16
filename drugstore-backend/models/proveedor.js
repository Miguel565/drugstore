const pool = require('../utils/db');

// Obtener todos los proveedores
async function getAllProveedores() {
	const res = await pool.query('SELECT * FROM proveedores');
	return res.rows;
}

// Obtener proveedor por id
async function getProveedorById(id) {
	const res = await pool.query('SELECT * FROM proveedores WHERE id = $1', [id]);
	return res.rows[0];
}

// Crear proveedor
async function createProveedor(data) {
	const {
		tipo_identificacion,
		numero_identificacion,
		razon_social,
		direccion,
		nombre_contacto,
		celular_contacto,
		actividad_economica,
		email
	} = data;
	const res = await pool.query(
		`INSERT INTO proveedores (tipo_identificacion, numero_identificacion, razon_social, direccion, nombre_contacto, celular_contacto, actividad_economica, email)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
		[tipo_identificacion, numero_identificacion, razon_social, direccion, nombre_contacto, celular_contacto, actividad_economica, email]
	);
	return res.rows[0];
}

// Actualizar proveedor
async function updateProveedor(id, data) {
	const {
		tipo_identificacion,
		numero_identificacion,
		razon_social,
		direccion,
		nombre_contacto,
		celular_contacto,
		actividad_economica,
		email
	} = data;
	const res = await pool.query(
		`UPDATE proveedores SET tipo_identificacion=$1, numero_identificacion=$2, razon_social=$3, direccion=$4, nombre_contacto=$5, celular_contacto=$6, actividad_economica=$7, email=$8 WHERE id=$9 RETURNING *`,
		[tipo_identificacion, numero_identificacion, razon_social, direccion, nombre_contacto, celular_contacto, actividad_economica, email, id]
	);
	return res.rows[0];
}

// Eliminar proveedor
async function deleteProveedor(id) {
	await pool.query('DELETE FROM proveedores WHERE id = $1', [id]);
}

module.exports = {
	getAllProveedores,
	getProveedorById,
	createProveedor,
	updateProveedor,
	deleteProveedor
};
