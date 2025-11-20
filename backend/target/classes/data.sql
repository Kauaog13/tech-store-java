USE techstore_db;

INSERT INTO produtos (nome, preco, estoque, categoria, descricao, imagem_url) VALUES

-- Processadores
('Processador Intel Core i5-13400F', 1399.90, 20, 'Processador', 
 'O processador Intel Core i5-13400F oferece 10 núcleos (6 de performance e 4 de eficiência) e frequência turbo máxima de 4.60 GHz. Ideal para jogos e multitarefas.', 
 'https://m.media-amazon.com/images/I/61DyM9M5D5L._AC_SX679_.jpg'),

('Processador AMD Ryzen 5 5600G', 899.00, 35, 'Processador', 
 'Com gráficos integrados Radeon, o Ryzen 5 5600G possui 6 núcleos e 12 threads, sendo uma excelente opção custo-benefício para quem não possui placa de vídeo dedicada.', 
 'https://m.media-amazon.com/images/I/51f2hkWjTlL._AC_SX679_.jpg'),

('Processador AMD Ryzen 7 5700X', 1150.00, 15, 'Processador', 
 'Potência pura para gamers e criadores. 8 núcleos e 16 threads com arquitetura Zen 3, entregando performance excepcional em jogos e renderização.', 
 'https://m.media-amazon.com/images/I/61DYLoyNRWL._AC_SX679_.jpg'),

-- Placas de Vídeo
('Placa de Vídeo RTX 3060 12GB', 1899.90, 10, 'Placa de Vídeo', 
 'Equipada com 12GB de VRAM GDDR6, Ray Tracing e DLSS. Rode os jogos mais atuais em Full HD e Quad HD com alta taxa de quadros.', 
 'https://m.media-amazon.com/images/I/715-a+68Q+L._AC_SX679_.jpg'),

('Placa de Vídeo RTX 4070 Ti', 5699.00, 5, 'Placa de Vídeo', 
 'Performance extrema para 4K. Arquitetura Ada Lovelace, DLSS 3.0 e Ray Tracing de terceira geração para o máximo de realismo.', 
 'https://m.media-amazon.com/images/I/71U+7l-yTJL._AC_SX679_.jpg'),

('Placa de Vídeo RX 6600 8GB', 1299.00, 12, 'Placa de Vídeo', 
 'A melhor opção custo-benefício para jogar em 1080p. Eficiência energética e arquitetura RDNA 2 da AMD.', 
 'https://m.media-amazon.com/images/I/81t6L55-B5L._AC_SX679_.jpg'),

-- Memória RAM
('Memória RAM 8GB DDR4 3200MHz Fury', 159.90, 100, 'Memória RAM', 
 'Upgrade essencial. Memória de alta performance com dissipador de calor assimétrico e compatibilidade com Intel XMP e AMD Ryzen.', 
 'https://m.media-amazon.com/images/I/51b2a8a2GfL._AC_SX679_.jpg'),

('Memória RAM 16GB DDR5 5200MHz', 450.00, 50, 'Memória RAM', 
 'A nova geração de velocidade. DDR5 oferece o dobro de largura de banda para sistemas de última geração.', 
 'https://m.media-amazon.com/images/I/51X3VlK7sUL._AC_SX679_.jpg'),

-- Armazenamento
('SSD NVMe 1TB Kingston', 399.90, 40, 'Armazenamento', 
 'Velocidade incrível de leitura e gravação (até 3500MB/s). Carregue jogos e o sistema operacional em segundos.', 
 'https://m.media-amazon.com/images/I/71GLmj7tYxL._AC_SX679_.jpg'),

('SSD SATA 480GB SanDisk', 229.00, 60, 'Armazenamento', 
 'Confiabilidade e velocidade muito superior a um HD tradicional. Perfeito para dar vida nova a computadores e notebooks.', 
 'https://m.media-amazon.com/images/I/71+pQ+lK9cL._AC_SX679_.jpg'),

-- Periféricos
('Mouse Gamer Logitech G Pro X Superlight', 699.00, 25, 'Periféricos', 
 'O mouse preferido dos profissionais de eSports. Pesando menos de 63g, oferece precisão sub-mícron com o sensor HERO 25K.', 
 'https://m.media-amazon.com/images/I/51dSuhu0k8L._AC_SX679_.jpg'),

('Teclado Mecânico Redragon Kumara', 249.90, 40, 'Periféricos', 
 'Teclado compacto (TKL) com switches mecânicos táteis, iluminação LED vermelha e construção robusta em metal e plástico ABS.', 
 'https://m.media-amazon.com/images/I/61vXJ+GqHPL._AC_SX679_.jpg'),

('Headset HyperX Cloud Stinger 2', 279.90, 30, 'Periféricos', 
 'Conforto leve e qualidade de som superior. Drivers de 50mm e microfone com cancelamento de ruído giratório.', 
 'https://m.media-amazon.com/images/I/61X+3d0d7AL._AC_SX679_.jpg'),

-- Monitores
('Monitor Gamer LG UltraGear 24" 144Hz', 999.00, 18, 'Monitor', 
 'Tecnologia IPS com 1ms de resposta real (GtG) e 144Hz. Cores vibrantes e fluidez total para jogos competitivos.', 
 'https://m.media-amazon.com/images/I/71C9+0-kLdL._AC_SX679_.jpg'),

('Monitor Dell 27" 4K USB-C', 2899.00, 8, 'Monitor', 
 'Resolução Ultra HD 4K com hub USB-C integrado. Perfeito para produtividade, design e consumo de mídia com máxima definição.', 
 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SX679_.jpg'),

-- Gabinetes e Fontes
('Gabinete Gamer ATX RGB Vidro Temperado', 349.90, 20, 'Gabinete', 
 'Design moderno com painel frontal em mesh para máximo fluxo de ar, lateral em vidro temperado e 3 ventoinhas RGB inclusas.', 
 'https://m.media-amazon.com/images/I/71p-l2+sT5L._AC_SX679_.jpg'),

('Fonte Corsair 650W 80 Plus Bronze', 399.00, 25, 'Fonte', 
 'Energia confiável e eficiente para o seu setup. Certificação 80 Plus Bronze e ventoinha silenciosa de 120mm.', 
 'https://m.media-amazon.com/images/I/71s1G5b1ZBL._AC_SX679_.jpg');