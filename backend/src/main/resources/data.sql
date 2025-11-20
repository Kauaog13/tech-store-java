USE techstore_db;

INSERT INTO produtos (nome, preco, estoque, categoria, descricao, imagem_url) VALUES

-- Processadores
('Processador Intel Core i5-13400F', 1399.90, 20, 'Processador', 
 'O processador Intel Core i5-13400F oferece 10 núcleos (6 de performance e 4 de eficiência) e frequência turbo máxima de 4.60 GHz. Ideal para jogos e multitarefas.', 
 'https://images.kabum.com.br/produtos/fotos/405766/processador-intel-core-i5-13400f-4-6ghz-max-turbo-cache-20mb-10-nucleos-16-threads-lga-1700-bx8071513400f_1672752804_gg.jpg'),

('Processador AMD Ryzen 5 5600G', 899.00, 35, 'Processador', 
 'Com gráficos integrados Radeon, o Ryzen 5 5600G possui 6 núcleos e 12 threads, sendo uma excelente opção custo-benefício para quem não possui placa de vídeo dedicada.', 
 'https://m.media-amazon.com/images/I/51f2hkWjTlL._AC_SL1000_.jpg'),

('Processador AMD Ryzen 7 5700X', 1150.00, 15, 'Processador', 
 'Potência pura para gamers e criadores. 8 núcleos e 16 threads com arquitetura Zen 3, entregando performance excepcional em jogos e renderização.', 
 'https://m.media-amazon.com/images/I/61DYLoyNRWL._AC_SL1000_.jpg'),

-- Placas de Vídeo
('Placa de Vídeo RTX 3060 12GB', 1899.90, 10, 'Placa de Vídeo', 
 'Equipada com 12GB de VRAM GDDR6, Ray Tracing e DLSS. Rode os jogos mais atuais em Full HD e Quad HD com alta taxa de quadros.', 
 'https://images9.kabum.com.br/produtos/fotos/180539/placa-de-video-gigabyte-geforce-rtx-3060-gaming-oc-12g-12-gb-gddr6-rev-2-0-ray-tracing-gv-3060gaming_1626461646_gg.jpg'),

('Placa de Vídeo RTX 4070 Ti', 5699.00, 5, 'Placa de Vídeo', 
 'Performance extrema para 4K. Arquitetura Ada Lovelace, DLSS 3.0 e Ray Tracing de terceira geração para o máximo de realismo.', 
 'https://images.kabum.com.br/produtos/fotos/402564/placa-de-video-rtx-4070-ti-gigabyte-nvidia-geforce-12-gb-gddr6x-dlss-3-ray-tracing-gv-n407teagle-oc-12gd_1672920613_gg.jpg'),

('Placa de Vídeo RX 6600 8GB', 1299.00, 12, 'Placa de Vídeo', 
 'A melhor opção custo-benefício para jogar em 1080p. Eficiência energética e arquitetura RDNA 2 da AMD.', 
 'https://images.kabum.com.br/produtos/fotos/235984/placa-de-video-asrock-amd-radeon-rx-6600-cld-8g-8gb-90-ga2rzz-00uanf_1634738812_gg.jpg'),

-- Memória RAM
('Memória RAM 8GB DDR4 3200MHz Fury', 159.90, 100, 'Memória RAM', 
 'Upgrade essencial. Memória de alta performance com dissipador de calor assimétrico e compatibilidade com Intel XMP e AMD Ryzen.', 
 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/313833/xlarge/Mem-ria-Kingston-Fury-Beast-8GB-3200MHz-DDR4-CL16-Preto-KF432C16BB-8_1763403818.jpg'),

('Memória RAM XPG Lancer, RGB, 16GB, 5200MHz, DDR5', 450.00, 50, 'Memória RAM', 
 'A nova geração de velocidade. DDR5 oferece o dobro de largura de banda para sistemas de última geração. Iluminação RGB personalizável.', 
 'https://images.kabum.com.br/produtos/fotos/259455/memoria-gamer-xpg-ddr5-rgb-16gb-5200mhz-ddr5-cl38-preto-ax5u5200c3816g-clarbk_1637075481_gg.jpg'),

-- Armazenamento
('SSD NVMe 1TB Kingston', 399.90, 40, 'Armazenamento', 
 'Velocidade incrível de leitura e gravação (até 3500MB/s). Carregue jogos e o sistema operacional em segundos.', 
 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/400812/xlarge/SSD-1TB-Kingston-Nv2-M-2-2280-PCIe-NVMe-Leitura-3500MB-s-Grava-o-2100MB-s-Snv2s-1000g_1763138630.jpg'),

('SSD SATA 480GB SanDisk', 229.00, 60, 'Armazenamento', 
 'Confiabilidade e velocidade muito superior a um HD tradicional. Perfeito para dar vida nova a computadores e notebooks.', 
 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/212496/xlarge/SSD-480GB-Sandisk-Sata-III-2-5-Leitura-535-MB-s-E-Grava-o-445-MB-s-Sdssda-480g-G26_1761230325.jpg'),

-- Periféricos
('Mouse Gamer Logitech G Pro X Superlight', 699.00, 25, 'Periféricos', 
 'O mouse preferido dos profissionais de eSports. Pesando menos de 63g, oferece precisão sub-mícron com o sensor HERO 25K.', 
 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg'),

('Teclado Mecânico Redragon Kumara', 249.90, 40, 'Periféricos', 
 'Teclado compacto (TKL) com switches mecânicos táteis, iluminação LED vermelha e construção robusta em metal e plástico ABS.', 
 'https://m.media-amazon.com/images/I/71cngLX2xuL._AC_SL1500_.jpg'),

('Headset HyperX Cloud Stinger 2', 279.90, 30, 'Periféricos', 
 'Conforto leve e qualidade de som superior. Drivers de 50mm e microfone com cancelamento de ruído giratório.', 
 'https://images.kabum.com.br/produtos/fotos/461159/headset-gamer-sem-fio-hyperx-stinger-2-drivers-50mm-wireless-preto-676a2aa_1690900947_gg.jpg'),

-- Monitores
('Monitor Gamer LG UltraGear 24" 144Hz', 999.00, 18, 'Monitor', 
 'Tecnologia IPS com 1ms de resposta real (GtG) e 144Hz. Cores vibrantes e fluidez total para jogos competitivos.', 
 'https://images.kabum.com.br/produtos/fotos/614879/monitor-gamer-lg-ultragear-24-full-hd-ips-180hz-1ms-displayport-e-hdmi-nvidia-g-sync-amd-freesync-hdr10-srgb-99-24gs60f-b_1722881105_g.jpg'),

('Monitor Dell 27" 4K USB-C', 2899.00, 8, 'Monitor', 
 'Resolução Ultra HD 4K com hub USB-C integrado. Perfeito para produtividade, design e consumo de mídia com máxima definição.', 
 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg'),

-- Gabinetes e Fontes
('Gabinete Gamer ATX RGB Vidro Temperado', 349.90, 20, 'Gabinete', 
 'Design moderno com painel frontal em mesh para máximo fluxo de ar, lateral em vidro temperado e 3 ventoinhas RGB inclusas.', 
 'https://images.kabum.com.br/produtos/fotos/391028/gabinete-gamer-hayom-gb1713-mid-tower-led-rgb-atx-lateral-em-vidro-temperado-4x-cooler-fan-rgb-preto-gb-17-10-13_1666295084_gg.jpg'),

('Fonte Corsair 650W 80 Plus Bronze', 399.00, 25, 'Fonte', 
 'Energia confiável e eficiente para o seu setup. Certificação 80 Plus Bronze e ventoinha silenciosa de 120mm.', 
 'https://images6.kabum.com.br/produtos/fotos/516056/fonte-corsair-cx-series-cx650-650w-80-plus-bronze-sem-cabo-preto-cp-9020278-br_1714483460_gg.jpg');