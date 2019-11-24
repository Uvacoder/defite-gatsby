---
templateKey: blog-post
path: "/en/blog/full-image-in-markdown"
title: Full image in markdown
excerpt: Хак для картинок на всю ширину экрана в Markdown
date: 2019-02-03T18:35:00.000+00:00
published: false

---
Small hack for those, who want to make full-width images in their posts like Medium, for example.


Например, как тут:
<div class="image-with-caption"></div>

|  |
| :---: |
| Статья: https://medium.com/tall-west/lets-ditch-the-nav-bar-3692cb17cc67 |

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