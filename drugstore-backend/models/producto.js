const pool = require('../utils/db');

// Obtener todos los productos
async function getAllProductos() {
	const res = await pool.query('SELECT * FROM productos');
	return res.rows;
}

// Obtener producto por id
async function getProductoById(id) {
	const res = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
	return res.rows[0];
}

// Crear producto
async function createProducto(data) {
	const {
		codigo,
		nombre,
		descripcion,
		estado,
		laboratorio,
		fecha_registro,
		proveedor_id
	} = data;
	const res = await pool.query(
		`INSERT INTO productos (codigo, nombre, descripcion, estado, laboratorio, fecha_registro, proveedor_id)
		 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
		[codigo, nombre, descripcion, estado, laboratorio, fecha_registro, proveedor_id]
	);
	return res.rows[0];
}

// Actualizar producto
async function updateProducto(id, data) {
	const {
		codigo,
		nombre,
		descripcion,
		estado,
		laboratorio,
		fecha_registro,
		proveedor_id
	} = data;
	const res = await pool.query(
		`UPDATE productos SET codigo=$1, nombre=$2, descripcion=$3, estado=$4, laboratorio=$5, fecha_registro=$6, proveedor_id=$7 WHERE id=$8 RETURNING *`,
		[codigo, nombre, descripcion, estado, laboratorio, fecha_registro, proveedor_id, id]
	);
	return res.rows[0];
}

// Eliminar producto
async function deleteProducto(id) {
	await pool.query('DELETE FROM productos WHERE id = $1', [id]);
}

module.exports = {
	getAllProductos,
	getProductoById,
	createProducto,
	updateProducto,
	deleteProducto
};
