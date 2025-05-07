document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos en la página de productos
    cargarProductos();

    // Función para la carga de productos
    async function cargarProductos() {
        try {
            showLoading();

            let url = '/api/productos';

            const response = await fetch(url);
            const productos = await response.json();
            
            desplegarProductos(productos);    
        } catch (err) {
            console.error('Error al cargar productos:', err);
            mostrarError('Error al cargar los productos. Intenta nuevamente');
        } finally {
            hideLoading();
        }
    }

    // Mostrar productos en el DOM
    function desplegarProductos(productos) {
        const contenedorProductos = document.getElementById('lista-productos');

        if(!contenedorProductos) return;

        contenedorProductos.innerHTML = '';

        if(productos.length === 0) {
            contenedorProductos.innerHTML = `
                <div class="no-productos">
                    <p>No se encontraron productos</p>
                </div>
            `
            return;
        }

        productos.forEach(producto => {
            const tarjetaProducto = crearTarjetaProducto(producto);
            contenedorProductos.appendChild(tarjetaProducto);
        });
    }

    // Crear tarjeta de producto
    function crearTarjetaProducto(producto) {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.className = 'tarjeta-producto fade-in';
        
        tarjetaProducto.innerHTML = `
            <div class="contenedor-imagen-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
                ${producto.stock <= 0 ? '<span class="no-stock">Agotado</span>': ''}
            </div>
            <div class="info-producto">
                <h3>${producto.nombre}</h3>
                <p class="precio-producto">$${producto.precio.toFixed(2)}</p>
                <p class="descripcion-producto">${producto.descripcion}</p>
                <div class="meta-producto">
                    <span class="categoria-producto">${producto.categoria}</span>
                    <span class="stock-producto">${producto.stock} disponibles</span>
                </div>
                <div class="acciones-producto">
                    <button class="btn add-to-cart" data-id="${producto.id}"
                        ${producto.stock <= 0 ? 'disabled': ''}>
                        ${producto.stock <= 0 ? 'Agotado': 'Agregar al carrito'}
                    </button>
                </div>
            </div>                                                                                                    
        `;
        
        return tarjetaProducto;
    }

    // Mostrar indicador de carga
    function showLoading() {
        const productContainer = document.getElementById('product-list');
        if (productContainer) {
            productContainer.innerHTML = `
                <div class="contenedor-carga">
                    <div class="cargando-spinner"></div>
                    <p>Cargando productos...</p>
                </div>
            `;
        }
    }

    // Ocultar indicador de carga
    function hideLoading() {
        // El contenido será reemplazado por los productos
    }

    // Mostrar mensaje de error
    function mostrarError(mensaje) {
        const contenedorProducto = document.getElementById('lista-productos');
        if (contenedorProducto) {
            contenedorProducto.innerHTML = `
                <div class="mensaje-error">
                    <p>${mensaje}</p>
                    <button class="btn" onclick="window.location.reload()">Recargar</button>
                </div>
            `;
        }
    }
});