const { createApp } = Vue;

createApp({
  template: `
    <div>
      <h1>Lista de Equipos de la Liga Profesional de Argentina</h1>
      <ul>
        <li v-for="equipo in paginatedEquipos" :key="equipo.id">
          <img :src="equipo.imagen" :alt="equipo.nombre" width="100" height="100" />
          <div>
            <strong>{{ equipo.nombre }}</strong> (Fundado en {{ equipo.fundacion }})
            <br />
            {{ equipo.ubicacion }}, {{ equipo.estadio }}
          </div>
        </li>
      </ul>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
      </div>
    </div>
  `,
  data() {
    return {
      equipos: [
        { id: 1, nombre: "Club Atlético Aldosivi", fundacion: "29-03-1913", ubicacion: "Mar del Plata, Buenos Aires", estadio: "Estadio José María Minella", imagen: "img/aldosivi.webp" },
        { id: 2, nombre: "Asociación Atlética Argentinos Juniors", fundacion: "15-08-1904", ubicacion: "Ciudad Autónoma de Buenos Aires", estadio: "Estadio Diego Armando Maradona", imagen: "img/argentinojuniors.webp" },
        { id: 3, nombre: "Club Atlético Tucumán", fundacion: "27-09-1902", ubicacion: "San Miguel de Tucumán, Tucuman", estadio: "Estadio Monumental José Fierro", imagen: "img/atleticotucuman.webp" },
        { id: 4, nombre: "Club Atlético Banfield", fundacion: "21-01-1896", ubicacion: "Banfield, Buenos Aires", estadio: "Estadio Florencio Sola", imagen: "img/banfield.webp" },
        { id: 5, nombre: "Club Atlético Barracas Central", fundacion: "05-04-1904", ubicacion: "Ciudad Autónoma de Buenos Aires", estadio: "Estadio Claudio Tapia", imagen: "img/barracas.webp" },
        { id: 6, nombre: "Club Atlético Belgrano", fundacion: "19-03-1905", ubicacion: "Ciudad de Córdoba, Cordoba", estadio: "Estadio Julio Cesar Villagra", imagen: "img/belgrano.webp" },
        { id: 7, nombre: "Club Atlético Boca Juniors", fundacion: "03-04-1905", ubicacion: "Ciudad Autónoma de Buenos Aires", estadio: "Estadio Alberto J. Armando", imagen: "img/boca.webp" },
        { id: 8, nombre: "Club Atlético Central Córdoba", fundacion: "03-06-1919", ubicacion: "Cdad. de Santiago del Estero, Santiago del Estero", estadio: "Estadio Alfredo Terrera", imagen: "img/central.webp" },
        { id: 9, nombre: "Club y Social Deportivo Defensa y Justicia", fundacion: "20-03-1935", ubicacion: "Florencio Varela, Buenos Aires", estadio: "Estadio Norberto Tomaghello", imagen: "img/defensa.webp" },
        { id: 10, nombre: "Club Estudiantes de La Plata", fundacion: "04-08-1905", ubicacion: "La Plata, Buenos Aires", estadio: "Nuevo Estadio Jorge Luis Hirschi", imagen: "img/estudiantes.webp" },
        { id: 11, nombre: "Club de Gimnasia y Esgrima La Plata", fundacion: "03-06-1887", ubicacion: "La Plata, Buenos Aires", estadio: "Estadio Juan Carmelo Zerillo", imagen: "img/gimnasia.webp" },
        { id: 12, nombre: "Club Deportivo Godoy Cruz Antonio Tomba", fundacion: "01-06-1921", ubicacion: "Godoy Cruz, Mendoza", estadio: "Estadio Malvinas Argentinas", imagen: "img/godoycurz.webp" },
        { id: 13, nombre: "Club Atlético Huracán", fundacion: "01-11-1908", ubicacion: "Ciudad Autónoma de Buenos Aires", estadio: "Estadio Tomás Adolfo Ducó", imagen: "img/huracan.webp" },
        { id: 14, nombre: "Club Sportivo Independiente Rivadavia", fundacion: "24-01-1913", ubicacion: "Ciudad de Mendoza, Mendoza", estadio: "Estadio Bautista Gargantini", imagen: "img/rivadavia.webp" },
        { id: 15, nombre: "Club Atlético Independiente", fundacion: "01-01-1905", ubicacion: "Avellaneda, Buenos Aires", estadio: "Estadio Libertadores de América", imagen: "img/independiente.webp" },
        { id: 16, nombre: "Instituto Atlético Central Córdoba", fundacion: "08-08-1918", ubicacion: "Ciudad de Córdoba, Cordoba", estadio: "Estadio Juan Domingo Perón", imagen: "img/institutocordoba.webp" },
        { id: 17, nombre: "Club Atlético Lanús", fundacion: "03-01-1915", ubicacion: "Lanús, Buenos Aires", estadio: "Estadio Ciudad de Lanús - Néstor Díaz Pérez", imagen: "img/lanus.webp" },
        { id: 18, nombre: "Club Atlético Newells Old Boys", fundacion: "03-11-1903", ubicacion: "Rosario, Santa Fe", estadio: "Estadio Marcelo Bielsa", imagen: "img/newells.webp" },
        { id: 19, nombre: "Club Atlético Platense", fundacion: "25-05-1905", ubicacion: "Vicente López, Buenos Aires", estadio: "Estadio Ciudad de Vicente López", imagen: "img/platense.webp" },
        { id: 20, nombre: "Racing Club", fundacion: "25-03-1903", ubicacion: "Avellaneda, Buenos Aires", estadio: "Estadio Presidente Perón", imagen: "img/racing.webp" },
        { id: 21, nombre: "Club Deportivo Riestra", fundacion: "22-02-1931", ubicacion: "Ciudad Autónoma de Buenos Aires", estadio: "Estadio Guillermo Laza", imagen: "img/riestra.webp" },
        { id: 22, nombre: "Club Atlético River Plate", fundacion: "25-05-1901", ubicacion: "Ciudad Autónoma de Buenos Aires", estadio: "Estadio Mas Monumental", imagen: "img/riverplate.webp" },
        { id: 23, nombre: "Club Atlético Rosario Central", fundacion: "24-12-1889", ubicacion: "Rosario, Santa Fe", estadio: "Estadio Gigante de Arroyito", imagen: "img/rosaios.webp" },
        { id: 24, nombre: "Club Atlético San Martín", fundacion: "27-09-1907", ubicacion: "Ciudad de San Juan, San Juan", estadio: "Estadio Ingeniero Hilario Sánchez", imagen: "img/san martin.webp" },
        { id: 25, nombre: "Club Atlético San Lorenzo de Almagro", fundacion: "01-04-1908", ubicacion: "Ciudad Autónoma de Buenos Aires", estadio: "Estadio Pedro Bidegain", imagen: "img/sanlorenzo.webp" },
        { id: 26, nombre: "Club Atlético Sarmiento", fundacion: "01-04-1911", ubicacion: "Junín, Buenos Aires", estadio: "Estadio Eva Perón", imagen: "img/sarmiento.webp" },
        { id: 27, nombre: "Club Atlético Talleres", fundacion: "12-10-1913", ubicacion: "Ciudad de Córdoba, Cordoba", estadio: "Estadio Mario Alberto Kempes", imagen: "img/talleres.webp" },
        { id: 28, nombre: "Club Atlético Tigre", fundacion: "03-08-1902", ubicacion: "Tigre, Buenos Aires", estadio: "Estadio José Dellagiovanna", imagen: "img/tigre.webp" },
        { id: 29, nombre: "Club Atlético Unión", fundacion: "15-04-1907", ubicacion: "Ciudad de Santa Fé, Santa Fe", estadio: "Estadio 15 de abril", imagen: "img/union.webp" },
        { id: 30, nombre: "Club Atlético Vélez Sarsfield", fundacion: "01-01-1910", ubicacion: "Ciudad Autónoma de Buenos Aires", estadio: "Estadio José Amalfitani", imagen: "img/velez.webp" },
      ],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.equipos.length / this.itemsPerPage);
    },
    paginatedEquipos() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.equipos.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
}).mount('#app');