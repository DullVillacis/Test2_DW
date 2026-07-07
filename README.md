# API GraphQL — Caso de estudio: Biblioteca 📚

API desarrollada con **Node.js** y **GraphQL (Apollo Server v4)**.

## Entidades relacionadas

```
Autor (1) ────< (N) Libro
```

- Un **Autor** puede tener muchos **Libros**.
- Un **Libro** pertenece a un solo **Autor** (campo `autorId`).

## Estructura del proyecto

```
biblioteca-graphql-api/
├── package.json
└── src/
    ├── index.js       → Punto de entrada / arranque del servidor Apollo
    ├── schema.js      → Schema GraphQL (typeDefs)
    ├── resolvers.js   → Resolvers (Query, Mutation y relaciones)
    └── data.js        → Fuente de datos (arreglos en memoria)
```

## Requisitos

- Node.js 18 o superior.

## Instalación y ejecución

```bash
npm install
npm start
```

El servidor quedará disponible en: **http://localhost:4000/**
Abre esa URL en el navegador para usar **Apollo Sandbox** y escribir consultas.

---

## Ejemplos de consultas GraphQL

### 1. Consultar todos los autores con sus libros (relación 1→N)

```graphql
query {
  autores {
    id
    nombre
    nacionalidad
    totalLibros
    libros {
      titulo
      anio
    }
  }
}
```

### 2. Mostrar únicamente determinados campos

```graphql
query {
  libros {
    titulo
    disponible
  }
}
```

### 3. Consultar un registro específico (por id)

```graphql
query {
  libro(id: "101") {
    titulo
    genero
    anio
    autor {
      nombre        # relación N→1
      nacionalidad
    }
  }
}
```

### 4. Filtrar por un valor determinado (filtros combinables)

```graphql
query {
  libros(genero: "Cuento", disponible: true) {
    titulo
    anio
  }
}
```

```graphql
query {
  libros(anioDesde: 1960, anioHasta: 1985) {
    titulo
    anio
  }
}
```

### 5. Búsqueda por texto en el título

```graphql
query {
  buscarLibros(texto: "amor") {
    titulo
    autor { nombre }
  }
}
```

---

## Ejemplos de mutaciones (escritura)

```graphql
mutation {
  agregarAutor(nombre: "Julio Cortázar", nacionalidad: "Argentina", anioNacimiento: 1914) {
    id
    nombre
  }
}
```

```graphql
mutation {
  agregarLibro(titulo: "Rayuela", genero: "Novela", anio: 1963, autorId: "3") {
    id
    titulo
    autor { nombre }
  }
}
```

```graphql
mutation {
  cambiarDisponibilidad(id: "101", disponible: false) {
    titulo
    disponible
  }
}
```

```graphql
mutation {
  eliminarLibro(id: "105")
}
```

---

## Guía rápida para la presentación

El docente puede pedir modificaciones sobre las consultas. Aquí dónde tocar:

| Pedido del docente                       | Qué hacer                                                            |
| ---------------------------------------- | ------------------------------------------------------------------- |
| Mostrar solo ciertos campos              | Quitar/agregar campos dentro de `{ ... }` en la consulta            |
| Consultar un registro específico         | Usar `libro(id: "...")` o `autor(id: "...")`                         |
| Filtrar por un valor                     | Usar argumentos en `libros(genero: ..., disponible: ...)`           |
| Agregar un atributo nuevo a una entidad  | Editar `src/schema.js` (tipo) + `src/data.js` (dato) + resolver     |
| Agregar una nueva consulta/filtro        | Editar `type Query` en `schema.js` y su resolver en `resolvers.js`  |
