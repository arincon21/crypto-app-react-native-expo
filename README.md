# 📱 Crypto App

Aplicación móvil construida con **React Native + Expo** para visualizar información de criptomonedas en tiempo real usando la API pública de [Coinlore](https://www.coinlore.com/).

---

## 🧠 Tecnologías utilizadas

- **Expo** (con soporte para Expo Go y builds nativos)
- **React Native** + **TypeScript**
- **React Navigation** (Stack)
- **Coinlore API** para datos de criptomonedas
- **@expo/vector-icons** para íconos modernos
- **Animated API** para animaciones suaves
- **Estilos custom modernos** (paleta azul / diseño limpio)
- Soporte para **modo oscuro** y **botón flotante para volver arriba**

---

## 📁 Estructura de carpetas

```
/assets             # Imágenes, íconos, fuentes
/src
  /screens          # Pantallas principales (WelcomeScreen, CryptoListScreen, etc.)
  /navigation       # Configuración de navegación
  /hooks            # Hooks personalizados (useCryptos)
  /models           # Modelos de datos (Crypto.ts)
App.tsx             # Punto de entrada principal
app.json            # Configuración de Expo
package.json        # Dependencias y scripts
```

---
## 🧱 Arquitectura y estilo de código

El proyecto aplica principios de **Programación Orientada a Objetos (OOP)** en la representación de modelos de datos.

- `src/models/Crypto.ts` implementa una **clase `Crypto`**
- Se encapsulan propiedades como `price_usd`, `market_cap_usd`, etc.
- Se añaden métodos como `getFormattedPrice()` para abstraer lógica
- Esta estructura mejora la **reusabilidad**, **claridad** y **mantenibilidad** del código

---

## 🚀 ¿Cómo iniciar el proyecto?

```bash
git clone <repo-url>
cd crypto-app
npm install
npx expo start
```

📱 Escanea el QR con **Expo Go** para ver la app en tu dispositivo.

---

## 🔧 Configuración de Expo

En `app.json` puedes configurar:

- Nombre de la app
- Ícono (`assets/icon.png`)
- Splash screen (`assets/splash.png`)
- Orientación, fondo, etc.

---

## 📦 Cómo generar el APK

Para generar un APK de Android:

```bash
npx expo install eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

> El archivo `.apk` estará disponible en el dashboard de [EAS Build](https://expo.dev/accounts).

---

## 📤 Archivos requeridos para publicar en Google Play

1. `android.keystore` (Expo lo puede generar automáticamente)
2. `google-services.json` (si usas notificaciones o login de Google)
3. Icono en `assets/icon.png` (512x512)
4. Splash screen en `assets/splash.png` (preferiblemente 1242x2436)
5. Configura `app.json` con:
```json
{
  "expo": {
    "name": "Crypto App",
    "slug": "crypto-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    ...
  }
}
```

---

## 📱 Compilar para iOS

Para compilar la aplicación para iOS usando Expo, sigue estos pasos:

1. **Instala Expo CLI** (si no lo tienes):
   ```bash
   npm install -g expo-cli
   ```

2. **Inicia sesión en Expo**:
   ```bash
   expo login
   ```

3. **Compila para iOS** (requiere cuenta en Expo y Apple):
   ```bash
   npx expo export --platform ios
   ```

   O bien, usando EAS (Expo Application Services):
   ```bash
   npx eas build --platform ios
   ```

4. **Publica la app en TestFlight o App Store**:
   - Para eso necesitarás una cuenta de desarrollador Apple y seguir los pasos de publicación desde [Apple Developer](https://developer.apple.com).

> 💡 Asegúrate de tener configurado correctamente `eas.json` si usas EAS Build.

---

## ✨ Funcionalidades

- 🔍 Búsqueda en tiempo real por nombre
- 📈 Detalles completos por cripto (precio, ranking, % cambio, volumen, supply)
- 🟢 Colores dinámicos para ganancias/pérdidas
- 🆙 Botón flotante para volver arriba con animación
- 🌐 Pantalla de bienvenida con branding
- 🎨 Estilo limpio, azul moderno (Azure theme)
- ⚡ Scroll optimizado para listas largas
- 📱 Compatible con Expo Go y builds nativos

---

## 🛠️ Futuras mejoras sugeridas

- ⭐ Favoritos con almacenamiento local
- 📊 Gráficos de variación de precios
- 🌗 Botón para cambiar modo oscuro/claro manualmente
- 🔒 Autenticación opcional
- 📤 Publicación en App Store

---

## 👨‍💻 Autor

Desarrollado por Alvaro Rincón.  
¿Dudas o sugerencias? ¡Contribuciones bienvenidas!

---

