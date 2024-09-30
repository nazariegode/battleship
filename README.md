# Battleship Game

## Descripción

Battleship es un juego clásico de estrategia en el que dos jugadores intentan hundir los barcos del oponente adivinando sus posiciones en un tablero. Este proyecto es una implementación en React que permite a un jugador competir contra la CPU.

## Características

- Dos tableros: uno para el jugador y otro para la CPU.
- Jugabilidad interactiva con feedback visual de los disparos (rojo para impactos y blanco para fallos).
- Simulación de ataques de la CPU.
- Muestra el número de impactos en el tablero del jugador y quién está ganando.

## Tecnologías Utilizadas

- **React**: Para construir la interfaz del usuario.
- **CSS**: Para estilizar los componentes y hacer la experiencia más atractiva.

## Instalación

Sigue estos pasos para ejecutar el juego en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/nazariegode/battleship.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd battleship
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Inicia la aplicación:
   ```bash
   npm start
   ```

5. Abre tu navegador y visita `http://localhost:3000` para jugar.

## Cómo Jugar

1. Elige un espacio en el tablero de la CPU y haz clic para disparar.
2. Observa el resultado del ataque: si el color es rojo, has acertado; si es blanco, has fallado.
3. La CPU también atacará después de tu turno.
4. El juego continuará hasta que un jugador haya hundido todos los barcos del oponente.

## Contribuciones

Si deseas contribuir a este proyecto, siéntete libre de hacer un fork del repositorio y enviar un pull request. Todas las contribuciones son bienvenidas.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
