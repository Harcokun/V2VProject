import mariadb from 'mariadb'; 

const pool = mariadb.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: `${process.env.DOCKER_MARIADB_ROOT_PASSWORD}`,
    database: 'Car'
})

