export const typeDefs = `
  type Autor {
    id: ID!
    nombre: String!
    nacionalidad: String
    anioNacimiento: Int
    libros: [Libro!]!
    totalLibros: Int!
  }

  type Libro {
    id: ID!
    titulo: String!
    genero: String
    anio: Int
    paginas: Int
    disponible: Boolean!
    autor: Autor!
  }

  type Query {
    autores: [Autor!]!
    autor(id: ID!): Autor

    libros(
      genero: String
      disponible: Boolean
      anioDesde: Int
      anioHasta: Int
    ): [Libro!]!

    libro(id: ID!): Libro

    buscarLibros(texto: String!): [Libro!]!
  }

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

    cambiarDisponibilidad(id: ID!, disponible: Boolean!): Libro!
  }
`;
