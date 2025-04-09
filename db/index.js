const {Pool} = require('pg')

const pool = new Pool({
    user: 'expressmini',
    password: 'shipsallaround',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    })

/**
 * Executes a database transaction safely using the provided callback function
 * @param {Function} callback - Async function that receives a client and executes queries
 * @returns {Promise<any>} - Result from the callback function
 */
async function executeTransaction(callback) 
{
    console.log('Executing transcation in wrapper');
    const client = await pool.connect();
    try 
    {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } 
    catch (error) 
    {
        await client.query('ROLLBACK');
        throw error;
    }
    finally 
    {
        client.release();
    }
}
  

module.exports = {pool,executeTransaction}