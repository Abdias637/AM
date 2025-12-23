const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Productos estáticos
const products = [
  {
    id: 1,
    name: "Trofeo Deportivo Premium",
    category: "trofeos",
    description: "Trofeo en acrílico y metal con base de mármol. Ideal para competencias deportivas de élite.",
    price: "Desde $350",
    image: "/img/trofeo1.jpg",
    features: ["Acrílico de alta calidad", "Base de mármol", "Grabado láser"]
  },
  {
    id: 2,
    name: "Medalla Competitiva",
    category: "medallas",
    description: "Medalla grabada en metal con baño de oro o plata. Cinta personalizable disponible.",
    price: "Desde $120",
    image: "/img/medalla1.jpg",
    features: ["Baño de oro/plata", "Cinta personalizable", "Grabado profesional"]
  },
  {
    id: 3,
    name: "Placa de Reconocimiento",
    category: "placas",
    description: "Placa grabada profesional en metal o madera. Perfecta para empresas e instituciones.",
    price: "Desde $250",
    image: "/img/trofeo1.jpg",
    features: ["Metal o madera", "Grabado profesional", "Diseño personalizado"]
  },
  {
    id: 4,
    name: "Trofeo Corporativo",
    category: "trofeos",
    description: "Diseño ejecutivo para empresas y corporaciones. Elegancia y prestigio.",
    price: "Desde $450",
    image: "/img/trofeo1.jpg",
    features: ["Diseño ejecutivo", "Materiales premium", "Personalización total"]
  },
  {
    id: 5,
    name: "Medalla Deportiva",
    category: "medallas",
    description: "Medalla para eventos deportivos con cinta de colores personalizada.",
    price: "Desde $95",
    image: "/img/medalla1.jpg",
    features: ["Para eventos deportivos", "Cinta de colores", "Durabilidad"]
  },
  {
    id: 6,
    name: "Copa Competitiva",
    category: "trofeos",
    description: "Copa en metal brillante para campeonatos importantes.",
    price: "Desde $420",
    image: "/img/trofeo1.jpg",
    features: ["Metal brillante", "Acabado premium", "Base estable"]
  },
  {
    id: 7,
    name: "Placa Conmemorativa",
    category: "placas",
    description: "Placa para eventos especiales y aniversarios.",
    price: "Desde $180",
    image: "/img/trofeo1.jpg",
    features: ["Para eventos especiales", "Diseño elegante", "Variedad de tamaños"]
  },
  {
    id: 8,
    name: "Trofeo Académico",
    category: "trofeos",
    description: "Diseño educativo para escuelas y universidades.",
    price: "Desde $320",
    image: "/img/trofeo1.jpg",
    features: ["Diseño educativo", "Durabilidad", "Precio accesible"]
  }
];

// Rutas para servir archivos HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "products.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// API para productos
app.get("/api/products", (req, res) => {
  const category = req.query.category;
  const filtered = category 
    ? products.filter(p => p.category === category)
    : products;
  res.json(filtered);
});

// API para pedidos
app.post("/api/order", (req, res) => {
  const { nombre, email, telefono, producto, cantidad, fecha_entrega, mensaje } = req.body;
  
  console.log("📦 NUEVA SOLICITUD DE COTIZACIÓN:");
  console.log("Cliente:", nombre);
  console.log("Email:", email);
  console.log("Teléfono:", telefono);
  console.log("Producto:", producto);
  console.log("Cantidad:", cantidad);
  console.log("Fecha entrega:", fecha_entrega);
  console.log("Mensaje:", mensaje);
  
  const whatsappNumber = process.env.WHATSAPP_NUMBER || "525664099645";
  const whatsappMessage = encodeURIComponent(
    `Hola AMQ, solicito cotización:\n\n` +
    `👤 Nombre: ${nombre}\n` +
    `📧 Email: ${email}\n` +
    `📞 Teléfono: ${telefono}\n` +
    `🏆 Producto: ${producto}\n` +
    `📦 Cantidad: ${cantidad || 'No especificada'}\n` +
    `📅 Fecha entrega: ${fecha_entrega || 'No especificada'}\n` +
    `💬 Mensaje: ${mensaje || 'Sin mensaje adicional'}`
  );
  
  res.json({
    success: true,
    message: "Solicitud recibida correctamente. Te contactaremos en menos de 24 horas.",
    whatsapp: `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
  });
});

// Middleware para manejar errores 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor AMQ activo en: http://localhost:${PORT}`);
  console.log(`📱 WhatsApp: ${process.env.WHATSAPP_NUMBER || '525664099645'}`);
});