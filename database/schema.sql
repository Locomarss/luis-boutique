CREATE TABLE categories (
  id VARCHAR(60) PRIMARY KEY,
  label VARCHAR(120) NOT NULL
);

CREATE TABLE products (
  id VARCHAR(60) PRIMARY KEY,
  slug VARCHAR(60) UNIQUE NOT NULL,
  category_id VARCHAR(60) NOT NULL,
  name VARCHAR(160) NOT NULL,
  subtitle VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  badge VARCHAR(80),
  featured BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_sizes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id VARCHAR(60) NOT NULL,
  size_label VARCHAR(30) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id VARCHAR(60) NOT NULL,
  variant_code VARCHAR(40) NOT NULL,
  variant_name VARCHAR(80) NOT NULL,
  swatch VARCHAR(20) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_variant_id INT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(140) NOT NULL,
  email VARCHAR(160) UNIQUE,
  preferred_language VARCHAR(20) DEFAULT 'es'
);

CREATE TABLE carts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  status VARCHAR(20) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cart_id INT NOT NULL,
  product_id VARCHAR(60) NOT NULL,
  variant_code VARCHAR(40) NOT NULL,
  size_label VARCHAR(30) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (cart_id) REFERENCES carts(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
