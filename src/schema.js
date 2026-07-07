
export const typeDefs = `#graphql
  # ---------- ENTIDAD: Autor ----------
  type Autor {
    id: ID!
    nombre: String!
    nacionalidad: String
    anioNacimiento: Int
    # Relación 1 -> N : todos los libros escritos por este autor
    libros: [Libro!]!
    # Campo derivado (calculado en el resolver)
    totalLibros: Int!
  }

  # ---------- ENTIDAD: Libro ----------
  type Libro {
    id: ID!
    titulo: String!
    genero: String
    anio: Int
    paginas: Int
    disponible: Boolean!
    # Relación N -> 1 : el autor al que pertenece el libro
    autor: Autor!
  }

  # ---------- CONSULTAS (lectura) ----------
  type Query {
    # Autores
    autores: [Autor!]!
    autor(id: ID!): Autor

    # Libros con filtros opcionales (todos combinables)
    libros(
      genero: String
      disponible: Boolean
      anioDesde: Int
      anioHasta: Int
    ): [Libro!]!

    # Un libro específico por su id
    libro(id: ID!): Libro

    # Búsqueda de texto libre en el título
    buscarLibros(texto: String!): [Libro!]!
  }

  # ---------- MUTACIONES (escritura) ----------
  type Mutation {
    agregarAutor(
      nombre: String!
      nacionalidad: String
      anioNacimiento: Int
    ): Autor!

    agregarLibro(
      titulo: String!
      genero: String
      anio: Int
      paginas: Int
      disponible: Boolean
      autorId: ID!
    ): Libro!

    eliminarLibro(id: ID!): Boolean!

    # Cambia la disponibilidad (prestar / devolver)
    cambiarDisponibilidad(id: ID!, disponible: Boolean!): Libro!
  }
`;
