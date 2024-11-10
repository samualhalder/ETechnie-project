CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,
                                                   firstName VARCHAR(100) NOT NULL,
                                                                          lastName VARCHAR(100) NOT NULL,
                                                                                                email VARCHAR(100) NOT NULL UNIQUE,
                                                                                                                            password VARCHAR(100) NOT NULL,
                                                                                                                                                  created_at TIMESTAMP DEFAULT NOW())

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    discount INT DEFAULT 0,
    image varchar(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
