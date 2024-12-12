## Environment Variables

Para correr estos proyectos es necesario tener estas variables de entorno correctamente, se subieron a GIT por ser un proyecto de prueba:

BACKEND SOLAMENTE:

`MONGODB_URI=mongodb+srv://dbUser:admin123@sellia-test.0047l.mongodb.net/?retryWrites=true&w=majority&appName=sellia-test`

`ORIGIN_URL=http://localhost:5173`

`JWT_SECRET=368879692053a483bdf25b0b6af846d135c326078420ca80d2a460ed0f3be6e2`


## Correr localmente

El proyecto se divide en dos carpetas, backend y frontend.

El diseño del backend fue realizado en Node.JS, mientras que el frontend con Vue.JS

Primero, nos localizamos en backend
```bash
  cd backend
```

Instalamos dependencias.

```bash
  npm install
```

Inicializamos el servidor con nodemon (ambiente de pruebas)

```bash
  npm run dev
```

En otra terminal:

Nos localizamos en frontend
```bash
  cd frontend
```

Instalamos dependencias.

```bash
  npm install
```


Inicializamos el servidor con vue (ambiente de pruebas)

```bash
  npm run dev
```




# Uso de la Aplicación

La aplicación funciona con un servidor basado en Node.JS con autenticación y creación de cuentas, por lo que tendrán que crear un usuario y contraseña, para iniciar sesión.

Al momento de tener acceso a la aplicación en el recuadro superior hay un select con los usuarios disponibles (cuentas creadas hasta el momento) en el cual se podrá crear un chat con cada usuario que se registre en el sistema.

Para realizar las pruebas de los Sockets en local, es necesario iniciar sesión en otra cuenta, en otra ventana (preferentemente de incógnito), y poder chatear con la cuenta.

## FeedBack

Cualquier Tipo de retroalimentación es bienvenida :)
