---
templateKey: blog-post
path: "/blog/full-image-in-markdown"
title: Картинка на всю ширину в Markdown
excerpt: Хак для картинок на всю ширину экрана в Markdown
date: 2019-02-03T18:35:00.000+00:00
published: true

---
Небольшой хак для тех, кто хочет делать посты с картинками во всю ширину экрана как было модно на [medium.com](https://medium.com).
Например, как тут:
<div class="image-with-caption"></div>

| ![Full width image](/uploads/medium-article.png) |
|:--:|
| Статья: [https://medium.com/tall-west/lets-ditch-the-nav-bar-3692cb17cc67](https://medium.com/tall-west/lets-ditch-the-nav-bar-3692cb17cc67) |

**markdown**

```markdown
![Full width image](/uploads/cornelius-dammrich-52hz-shot-a-web-high.jpg)
```

**css**

```css
img[alt~="full"] {
    position: relative;
    right: 50%;
    left: 50%;
    display: block;
    width: 100vw;
    margin-right: -50vw;
    margin-left: -50vw;
}
```

Способ "побега" из контекста может быть другим, важная часть находится в этом куске кода:

```css
img[alt~="full"] {
    ...
}
```

Эта запись означает, что будут выбраны все картинки, содержащие в атрибуте `alt` слово `full`. Таким образом мы описали картинку на случай, если её не будет и использовали возможности alt для стилизации.

**Обновление от 4.01.2020**

Markdown не запрещает использование html-тегов в разметке, поэтому можно добавить в свой файл что-то вроде:

```markdown
<div class="full-image"></div>

![Full width image](/uploads/cornelius-dammrich-52hz-shot-a-web-high.jpg)
```

И в таком случае в css понадобится прописать:

```css
.full-image + img {
  ...
  width: 100%;
}
```

У себя в теме я использую [Grid Layout](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout "Grid Layout"), поэтому к этому правилу добавилось еще и:

```css
.full-image + img {
  width: 100%;
  /* highlight-next-line */
  grid-column: 1 / 13;
}
```