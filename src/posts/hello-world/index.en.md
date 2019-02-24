---
templateKey: blog-post
path: /en/blog/hello-world
title: Hello World
excerpt: First post and some words about Netlify, Eslint and Codacy
date: "2018-11-04T00:29:09.284Z"
---

Почти полгода провисел мой блог на Gatsby без движения, потом я перевел его на версию next, и вот наконец-то сегодня дошли руки, чтобы смержить ветку v2 в мастер. Правда, не обошлось без проблем:

![Failed checks](./failed-checks.png)

То есть смержить я все могу и задеплоить тоже, но проверки как бы намекают, что Eslint мною очень недоволен.

Кстати, очень порадовала панель Netlify, в которой есть разбиение на деплои и превью, сразу видно, что, где и как:

![Netlify dashboard](./netlify-panel.png)

В итоге я потратил почти полтора часа на фикс 200+ замечаний Eslint, посмотрим, найдет ли их Codacy сейчас.
