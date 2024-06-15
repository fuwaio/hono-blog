import {
  ColorModeScript,
  ThemeSchemeScript,
  defaultConfig,
} from "@yamada-ui/react"
import { Hono } from "hono"
import { getCookie } from "hono/cookie"
import { renderToString } from "react-dom/server"

const app = new Hono()

app.get("*", (c) => {
  const colorMode = getCookie(c, "ui-color-mode")
  const themeScheme = getCookie(c, "ui-theme-scheme")

  return c.html(
    renderToString(
      <html lang="ja">
        <head>
          <script type="module" src="/src/client.tsx"></script>
        </head>
        <body>
          <ColorModeScript
            type="cookie"
            nonce="testing"
            initialColorMode={colorMode ?? defaultConfig.initialColorMode}
          />
          <ThemeSchemeScript
            type="cookie"
            nonce="testing"
            initialThemeScheme={themeScheme ?? defaultConfig.initialThemeScheme}
          />
          <div id="root"></div>
        </body>
      </html>,
    ),
  )
})

export default app