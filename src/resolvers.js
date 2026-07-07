
import { autores, libros } from "./data.js";

export const resolvers = {
  Query: {
    autores: () => autores,

    autor: (_padre, args) => autores.find((a) => a.id === args.id),

    libros: (_padre, args) => {
      let resultado = [...libros];

      if (args.genero !== undefined) {
        resultado = resultado.filter(
          (l) => l.genero.toLowerCase() === args.genero.toLowerCase()
        );
      }
      if (args.disponible !== undefined) {
        resultado = resultado.filter((l) => l.disponible === args.disponible);
      }
      if (args.anioDesde !== undefined) {
        resultado = resultado.filter((l) => l.anio >= args.anioDesde);
      }
      if (args.anioHasta !== undefined) {
        resultado = resultado.filter((l) => l.anio <= args.anioHasta);
      }
      return resultado;
    },

    libro: (_padre, args) => libros.find((l) => l.id === args.id),

    buscarLibros: (_padre, args) =>
      libros.filter((l) =>
        l.titulo.toLowerCase().includes(args.texto.toLowerCase())
      ),
  },

  Autor: {
    libros: (autor) => libros.filter((l) => l.autorId === autor.id),
    totalLibros: (autor) => libros.filter((l) => l.autorId === autor.id).length,
  },

  Libro: {
    autor: (libro) => autores.find((a) => a.id === libro.autorId),
  },

  Mutation: {
    agregarAutor: (_padre, args) => {
      const nuevo = {
        id: String(Date.now()),
        nombre: args.nombre,
        nacionalidad: args.nacionalidad ?? null,
        anioNacimiento: args.anioNacimiento ?? null,
      };
      autores.push(nuevo);
      return nuevo;
    },

    agregarLibro: (_padre, args) => {
      const autorExiste = autores.some((a) => a.id === args.autorId);
      if (!autorExiste) {
        throw new Error(`No existe un autor con id ${args.autorId}`);
      }
      const nuevo = {
        id: String(Date.now()),
        titulo: args.titulo,
        genero: args.genero ?? null,
        anio: args.anio ?? null,
        paginas: args.paginas ?? null,
        disponible: args.disponible ?? true,
        autorId: args.autorId,
      };
      libros.push(nuevo);
      return nuevo;
    },

    eliminarLibro: (_padre, args) => {
      const indice = libros.findIndex((l) => l.id === args.id);
      if (indice === -1) return false;
      libros.splice(indice, 1);
      return true;
    },

    cambiarDisponibilidad: (_padre, args) => {
      const libro = libros.find((l) => l.id === args.id);
      if (!libro) throw new Error(`No existe un libro con id ${args.id}`);
      libro.disponible = args.disponible;
      return libro;
    },
  },
};
