const pool = require('../utils/db');

// Obtener todas las recepciones
async function getAllRecepciones() {
	const res = await pool.query('SELECT * FROM recepciones');
	return res.rows;
}

// Obtener una recepción por id
async function getRecepcionById(id) {
	const res = await pool.query('SELECT * FROM recepciones WHERE id = $1', [id]);
	return res.rows[0];
}

// Crear recepción
async function createRecepcion(data) {
	const {
		fecha_recepcion,
		producto_id,
		proveedor_id,
		numero_factura,
		cantidad,
		lote,
		registro_invima,
		fecha_vencimiento,
		descripcion_presentacion
	} = data;
	const res = await pool.query(
		`INSERT INTO recepciones (fecha_recepcion, producto_id, proveedor_id, numero_factura, cantidad, lote, registro_invima, fecha_vencimiento, descripcion_presentacion)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
		[fecha_recepcion, producto_id, proveedor_id, numero_factura, cantidad, lote, registro_invima, fecha_vencimiento, descripcion_presentacion]
	);
	return res.rows[0];
}

// Actualizar recepción
async function updateRecepcion(id, data) {
	const {
		fecha_recepcion,
		producto_id,
		proveedor_id,
		numero_factura,
		cantidad,
		lote,
		registro_invima,
		fecha_vencimiento,
		descripcion_presentacion
	} = data;
	const res = await pool.query(
		`UPDATE recepciones SET fecha_recepcion=$1, producto_id=$2, proveedor_id=$3, numero_factura=$4, cantidad=$5, lote=$6, registro_invima=$7, fecha_vencimiento=$8, descripcion_presentacion=$9 WHERE id=$10 RETURNING *`,
		[fecha_recepcion, producto_id, proveedor_id, numero_factura, cantidad, lote, registro_invima, fecha_vencimiento, descripcion_presentacion, id]
	);
	return res.rows[0];
}

// Eliminar recepción
async function deleteRecepcion(id) {
	await pool.query('DELETE FROM recepciones WHERE id = $1', [id]);
}

module.exports = {
	getAllRecepciones,
	getRecepcionById,
	createRecepcion,
	updateRecepcion,
	deleteRecepcion
};
