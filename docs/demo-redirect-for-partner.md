# Демки: убрать витрину demo.wetrio.dev и вести назад на wetrio.dev

Витрина demo.wetrio.dev больше не нужна: все демки теперь показаны на основном сайте, в блоке Projects
(https://wetrio.dev/#projects). Нужно три правки в репозитории демок. Сами демки остаются на своих адресах.

## 1. demo.wetrio.dev → 301 на wetrio.dev/#projects

Витрину не удаляем в 404, а перенаправляем, чтобы старые ссылки продолжали работать.

Вариант для nginx, который сейчас отдаёт demo.wetrio.dev (server: nginx/1.27.5):

```nginx
server {
    server_name demo.wetrio.dev;
    return 301 https://wetrio.dev/#projects;
}
```

Если витрина раскатывается через `coolify-autodeploy` как отдельный сайт, можно просто убрать её из выкатки и
освободить адрес demo.wetrio.dev. Тогда напиши нам: мы повесим адрес на приложение wetrio.dev, редирект для этого
адреса в его коде уже есть (`next.config.ts`, `redirects()`). Через Coolify сделать это сейчас нельзя: адрес держит
nginx, о котором панель не знает.

## 2. Кнопка «назад» в каждой демке

Сейчас:

```html
<a class="demo-badge" href="https://demo.wetrio.dev" title="Back to WeTrio demos">← WeTrio demo</a>
```

Нужно:

```html
<a class="demo-badge" href="https://wetrio.dev/#projects" title="Back to WeTrio Dev">← WeTrio Dev</a>
```

Где поправить:

| Демка | Адрес | Кнопка сейчас |
|---|---|---|
| Nordhaus | https://nordhaus.demo.wetrio.dev | есть, ведёт на demo.wetrio.dev |
| Halden Gallery | https://halden.demo.wetrio.dev | есть, ведёт на demo.wetrio.dev |
| Parklab | https://parklab.demo.wetrio.dev/overview.html | на overview.html кнопки не нашли, проверить остальные страницы |
| Две демки «In build» | ещё не опубликованы | сразу делать с новой ссылкой |

## 3. Название без «Lab»

Студия убрала «Lab» из логотипа и текстов, теперь правильно **WeTrio Dev**. Если где-то в демках (title, meta,
бейдж, футер) осталось «WeTrio Development Lab» или «Dev Lab», заменить на «WeTrio Dev».

## Как проверить

```bash
curl -sI https://demo.wetrio.dev/ | grep -iE "^HTTP|^location"
# ожидаем: HTTP/2 301 и location: https://wetrio.dev/#projects

curl -s https://nordhaus.demo.wetrio.dev/ | grep -o 'class="demo-badge"[^>]*'
# ожидаем: href="https://wetrio.dev/#projects"
```

Все демки (`nordhaus.`, `halden.`, `parklab.`) должны открываться как раньше, со статусом 200.
